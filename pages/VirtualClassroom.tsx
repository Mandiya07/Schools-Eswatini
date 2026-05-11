import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Video as VideoIcon, Mic, MicOff, MonitorUp, PhoneOff, MessageSquare, 
  Files, BrainCircuit, Play, Clock, Download, ChevronLeft,
  Paperclip, Send, PenTool, Eraser, Type, MousePointer2, 
  StopCircle, LayoutDashboard, Circle, Square, VideoOff,
  MoreVertical, FileText, CheckCircle2, History
} from 'lucide-react';
import { Stage, Layer, Line, Circle as KonvaCircle, Rect as KonvaRect } from 'react-konva';
import io from 'socket.io-client';
import { GoogleGenAI } from '@google/genai';

const socket = io('/'); // connects to the same origin port 3000

const VirtualClassroom: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'chat' | 'files' | 'ai' | 'recordings'>('chat');
  const [isRecording, setIsRecording] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [viewMode, setViewMode] = useState<'video' | 'whiteboard'>('whiteboard');
  const [currentTime, setCurrentTime] = useState<string>('00:00:00');

  // Whiteboard state
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState<any[]>([]);
  const isDrawing = useRef(false);
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  // Chat state
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // AI Summary State
  const [aiSummary, setAiSummary] = useState("Generating Summary...");
  const [isGenerating, setIsGenerating] = useState(false);

  // Video state
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Multi-peer state
  const [peerStreams, setPeerStreams] = useState<{ [key: string]: MediaStream }>({});
  const peersRef = useRef<{ [key: string]: RTCPeerConnection }>({});

  useEffect(() => {
    const initWebRTCAndSocket = async () => {
      await startVideo();
      // Basic setup for socket implementation
      socket.emit('join-room', 'demo-room');

      socket.on('user-connected', async (newUserId) => {
        const pc = createConnection(newUserId);
        peersRef.current[newUserId] = pc;
        if (localStreamRef.current) {
          localStreamRef.current.getTracks().forEach(track => pc.addTrack(track, localStreamRef.current!));
        }
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('offer', { target: newUserId, offer });
      });

      socket.on('offer', async (payload) => {
        const pc = createConnection(payload.caller);
        peersRef.current[payload.caller] = pc;
        if (localStreamRef.current) {
          localStreamRef.current.getTracks().forEach(track => pc.addTrack(track, localStreamRef.current!));
        }
        await pc.setRemoteDescription(payload.offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('answer', { target: payload.caller, answer });
      });

      socket.on('answer', async (payload) => {
        if (peersRef.current[payload.caller]) {
          await peersRef.current[payload.caller].setRemoteDescription(payload.answer);
        }
      });

      socket.on('ice-candidate', (incoming) => {
        if (peersRef.current[incoming.sender] && incoming.candidate) {
          peersRef.current[incoming.sender].addIceCandidate(incoming.candidate).catch(e => console.error(e));
        }
      });

      socket.on('user-disconnected', (userId) => {
        if (peersRef.current[userId]) {
           peersRef.current[userId].close();
           delete peersRef.current[userId];
           setPeerStreams(prev => {
              const newStreams = {...prev};
              delete newStreams[userId];
              return newStreams;
           });
        }
      });

      socket.on('chat-message', (msg) => {
        setChatMessages((prev) => [...prev, msg]);
      });

      socket.on('draw', (drawingLines) => {
         setLines(drawingLines);
      });

      socket.on('clear-board', () => {
         setLines([]);
      });

      socket.on('file-share', (fileData) => {
         setSharedFiles(prev => [...prev, fileData]);
      });
    };

    initWebRTCAndSocket();

    return () => {
      socket.off('user-connected');
      socket.off('offer');
      socket.off('answer');
      socket.off('ice-candidate');
      socket.off('user-disconnected');
      socket.off('chat-message');
      socket.off('draw');
      socket.off('clear-board');
      socket.off('file-share');
      stopVideo();
      Object.values(peersRef.current).forEach(pc => pc.close());
      peersRef.current = {};
    };
  }, []);

  const createConnection = (targetId: string) => {
    const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    pc.onicecandidate = (event) => {
       if (event.candidate) {
          socket.emit('ice-candidate', { target: targetId, candidate: event.candidate });
       }
    };

    pc.ontrack = (event) => {
       setPeerStreams(prev => ({
         ...prev,
         [targetId]: event.streams[0]
       }));
    };

    return pc;
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      localStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Could not start video sources", err);
    }
  };

  const stopVideo = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoOff;
      });
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !isMuted;
      });
    }
  }, [isVideoOff, isMuted, localStream]);

  useEffect(() => {
    const handleResize = () => {
      if (stageContainerRef.current) {
        setStageSize({
          width: stageContainerRef.current.offsetWidth,
          height: stageContainerRef.current.offsetHeight,
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

  useEffect(() => {
    // Mock session timer
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      setCurrentTime(`${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (e: any) => {
    if (tool === 'eraser') {
      return; // Basic implementation: Eraser doesn't draw paths, just clears (or we could make it a white pen)
    }
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: any) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    if(lastLine) {
       lastLine.points = lastLine.points.concat([point.x, point.y]);
       lines.splice(lines.length - 1, 1, lastLine);
       const updatedLines = lines.concat();
       setLines(updatedLines);
       socket.emit('draw', updatedLines);
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const clearBoard = () => {
    setLines([]);
    socket.emit('clear-board');
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = { sender: 'You', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    socket.emit('chat-message', msg);
    setChatMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  const generateSummary = async () => {
    if (chatMessages.length === 0) {
      setAiSummary("No session data available yet. Please interact via chat.");
      return;
    }
    setIsGenerating(true);
    setAiSummary("Generating...");
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const transcript = chatMessages.map(m => `${m.sender}: ${m.text}`).join("\n");
      const prompt = `Based on the following virtual classroom transcript, provide a concise summary of the key takeaways and any action items/homework. Transcript:\n${transcript}`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      setAiSummary(response.text || "Summary generated successfully.");
    } catch (err) {
      console.error(err);
      setAiSummary("Error generating summary.");
    } finally {
      setIsGenerating(false);
    }
  };

  // File state
  const [sharedFiles, setSharedFiles] = useState<any[]>([
    { name: 'Math_SGCSE_2023_Past_Paper.pdf', size: '2.4 MB', sender: 'Tutor', dataUrl: null }
  ]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const newFile = {
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
          sender: 'You',
          dataUrl: event.target?.result as string
        };
        setSharedFiles(prev => [...prev, newFile]);
        socket.emit('file-share', {...newFile, sender: 'Peer'});
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDownload = (file: any) => {
    if (!file.dataUrl) {
      alert("This is a demo file. You cannot download it.");
      return;
    }
    const a = document.createElement('a');
    a.href = file.dataUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="h-screen bg-slate-900 flex flex-col font-sans text-slate-200 overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="h-16 border-b border-white/10 bg-slate-900 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">Advanced Mathematics (SGCSE)</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Tutor: Mr. Sipho Dlamini</p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-bold font-mono tracking-wider">{currentTime}</span>
          </div>

          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${isRecording ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-white/5 border-white/5 text-slate-400'}`}>
            {isRecording ? <StopCircle className="w-4 h-4 animate-pulse" /> : <Play className="w-4 h-4" />}
            <span className="text-xs font-bold uppercase tracking-widest">{isRecording ? 'Recording Session' : 'Recording Off'}</span>
          </div>

          <button 
            onClick={() => setIsRecording(!isRecording)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2"
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Whiteboard / Video Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-950 relative">
          
          {/* Main Display Area */}
          <div className="flex-1 relative overflow-hidden flex items-center justify-center">
            {viewMode === 'whiteboard' ? (
              <div 
                className="w-[calc(100%-48px)] h-[calc(100%-48px)] bg-[#1e293b] rounded-3xl border border-white/10 relative overflow-hidden"
                ref={stageContainerRef}
              >
                 {/* Mock Whiteboard Drawing Grid */}
                 <div className="absolute inset-0 opacity-20 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                 
                 <div className="absolute inset-0 z-10 cursor-crosshair">
                   <Stage
                     width={stageSize.width}
                     height={stageSize.height}
                     onMouseDown={handleMouseDown}
                     onMousemove={handleMouseMove}
                     onMouseup={handleMouseUp}
                     onTouchStart={handleMouseDown}
                     onTouchMove={handleMouseMove}
                     onTouchEnd={handleMouseUp}
                   >
                     <Layer>
                       {lines.map((line, i) => (
                         <Line
                           key={i}
                           points={line.points}
                           stroke="#60a5fa"
                           strokeWidth={4}
                           tension={0.5}
                           lineCap="round"
                           lineJoin="round"
                         />
                       ))}
                     </Layer>
                   </Stage>
                 </div>

                 {/* Whiteboard Toolbar */}
                 <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 p-2 bg-slate-900 rounded-2xl border border-white/10 shadow-2xl z-20">
                    <button onClick={() => setTool('pen')} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${tool === 'pen' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-slate-400'}`}><PenTool className="w-5 h-5" /></button>
                    <button onClick={clearBoard} className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center text-rose-400 transition-colors" title="Clear Board"><Eraser className="w-5 h-5" /></button>
                    <div className="w-8 mx-auto border-t border-white/10 my-2" />
                    <button className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center text-slate-400"><Square className="w-5 h-5" /></button>
                    <button className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center text-slate-400"><Circle className="w-5 h-5" /></button>
                 </div>
              </div>
            ) : (
               <div className="w-[calc(100%-48px)] h-[calc(100%-48px)] relative rounded-3xl overflow-hidden bg-slate-900 flex items-center justify-center">
                  {Object.keys(peerStreams).length > 0 ? (
                    <div className={`grid w-full h-full gap-4 p-4 ${Object.keys(peerStreams).length === 1 ? 'grid-cols-1' : Object.keys(peerStreams).length <= 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                      {Object.entries(peerStreams).map(([id, stream]) => (
                        <div key={id} className="relative rounded-2xl overflow-hidden bg-slate-800 shadow-lg border border-white/10">
                          <video 
                            ref={(el) => { if (el) el.srcObject = stream; }}
                            autoPlay 
                            playsInline 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg text-white font-bold text-sm tracking-wide">
                             Student
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-slate-500 font-bold uppercase tracking-widest text-sm animate-pulse flex flex-col items-center">
                      <MonitorUp className="w-12 h-12 mb-4 opacity-50" />
                      Waiting for participants...
                    </div>
                  )}
               </div>
            )}

            {/* Picture-in-Picture (Student Video + Mini Peers) */}
            <div className="absolute bottom-6 right-6 flex gap-4">
               {/* Show smaller peer PIPs when in Whiteboard mode */}
               {viewMode === 'whiteboard' && Object.entries(peerStreams).map(([id, stream]) => (
                 <div key={id} className="w-48 aspect-video bg-slate-800 rounded-2xl border-2 border-white/10 overflow-hidden shadow-2xl relative">
                    <video 
                      ref={(el) => { if (el) el.srcObject = stream; }}
                      autoPlay 
                      playsInline 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] text-white font-bold">
                       Student
                    </div>
                 </div>
               ))}

               {/* Local Self-View */}
               <div className="w-48 aspect-video bg-slate-800 rounded-2xl border-2 border-indigo-500/50 overflow-hidden shadow-2xl relative">
                  {!isVideoOff ? (
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="w-full h-full object-cover transform -scale-x-100" 
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                       <VideoOff className="w-6 h-6 mb-2" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Camera Off</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-indigo-600 backdrop-blur-md rounded text-[10px] text-white font-bold">
                     You
                  </div>
               </div>
            </div>
          </div>

          {/* Bottom Control Bar */}
          <div className="h-20 bg-slate-900 border-t border-white/10 flex items-center justify-center shrink-0">
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                >
                  {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>
                <button 
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isVideoOff ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                >
                  {isVideoOff ? <VideoOff className="w-6 h-6" /> : <VideoIcon className="w-6 h-6" />}
                </button>
                <button 
                  onClick={() => setViewMode(viewMode === 'video' ? 'whiteboard' : 'video')}
                  className="w-14 h-14 rounded-full bg-slate-800 text-white hover:bg-slate-700 flex items-center justify-center transition-all"
                  title={viewMode === 'video' ? 'Switch to Whiteboard' : 'Switch to Video'}
                >
                  {viewMode === 'video' ? <LayoutDashboard className="w-6 h-6" /> : <MonitorUp className="w-6 h-6" />}
                </button>
                
                <div className="w-px h-8 bg-white/10 mx-2" />
                
                <button 
                  onClick={() => navigate(-1)}
                  className="w-14 h-14 rounded-full bg-rose-600 text-white hover:bg-rose-700 flex items-center justify-center transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)]"
                >
                  <PhoneOff className="w-6 h-6" />
                </button>
             </div>
          </div>

        </div>

        {/* Right Column: Interaction Sidebar */}
        <div className="w-96 bg-slate-900 border-l border-white/10 flex flex-col shrink-0 relative z-10">
          
          {/* Tabs */}
          <div className="flex p-2 gap-1 border-b border-white/10 bg-slate-950">
             {[
               { id: 'chat', icon: MessageSquare, label: 'Chat' },
               { id: 'files', icon: Files, label: 'Files' },
               { id: 'ai', icon: BrainCircuit, label: 'AI Notes' },
               { id: 'recordings', icon: History, label: 'Past' },
             ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl transition-all ${activeTab === tab.id ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
               >
                 <tab.icon className="w-5 h-5" />
                 <span className="text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
               </button>
             ))}
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col bg-slate-900">
            
            {/* Chat Tab */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                  {chatMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-2">
                       <MessageSquare className="w-8 h-8 opacity-50" />
                       <p className="text-sm">No messages yet. Say hello!</p>
                    </div>
                  ) : (
                    chatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex gap-4 ${msg.sender === 'You' ? 'flex-row-reverse' : ''}`}>
                        {msg.sender === 'You' ? (
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs shrink-0text-white">Me</div>
                        ) : (
                          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" alt="Tutor" className="w-8 h-8 rounded-full border border-white/20 shrink-0" />
                        )}
                        <div className={`flex-1 flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                          <div className="flex items-baseline gap-2 mb-1">
                            {msg.sender === 'You' ? (
                              <>
                                <span className="text-[10px] text-slate-500 font-bold uppercase">{msg.time}</span>
                                <span className="font-bold text-sm text-white">You</span>
                              </>
                            ) : (
                              <>
                                <span className="font-bold text-sm text-indigo-400">Mr. Sipho</span>
                                <span className="text-[10px] text-slate-500 font-bold uppercase">{msg.time}</span>
                              </>
                            )}
                          </div>
                          <div className={`p-3 text-sm leading-relaxed ${msg.sender === 'You' ? 'bg-blue-600 rounded-2xl rounded-tr-none text-white' : 'bg-slate-800 rounded-2xl rounded-tl-none border border-white/5 text-slate-200'}`}>
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-4 border-t border-white/10 bg-slate-950">
                  <div className="bg-slate-800 rounded-2xl border border-white/10 p-2 flex items-end gap-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                    <button className="p-2 text-slate-400 hover:text-indigo-400 flex-shrink-0">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <textarea 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder="Type a message..." 
                      className="w-full bg-transparent border-none focus:ring-0 text-sm resize-none max-h-32 text-slate-200 placeholder-slate-600 py-2 min-h-[40px]"
                      rows={1}
                    />
                    <button onClick={sendMessage} className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex-shrink-0 transition-colors">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Files Tab */}
            {activeTab === 'files' && (
              <div className="flex-1 p-6 flex flex-col">
                <div className="mb-6 space-y-2 text-center">
                  <h3 className="text-white font-bold">Session Resources</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Files shared here are available to download during and after the session.</p>
                </div>
                
                {/* Drag and drop zone */}
                <div 
                  className="border-2 border-dashed border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 hover:border-indigo-500/50 transition-all cursor-pointer group mb-8"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <input 
                    type="file" 
                    id="file-upload" 
                    className="hidden" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const newFile = {
                            name: file.name,
                            size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
                            sender: 'You',
                            dataUrl: event.target?.result as string
                          };
                          setSharedFiles(prev => [...prev, newFile]);
                          socket.emit('file-share', {...newFile, sender: 'Peer'});
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Files className="w-5 h-5 text-indigo-400" />
                  </div>
                  <p className="text-sm font-bold text-white mb-1">Drag & Drop Files Here</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">or click to browse</p>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Shared Files ({sharedFiles.length})</p>
                  
                  {sharedFiles.map((f, idx) => (
                    <div key={idx} className="p-4 bg-slate-800 border border-white/5 rounded-2xl flex items-center justify-between group">
                      <div className="flex items-center gap-3 min-w-0">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${f.sender === 'You' ? 'bg-blue-500/20 text-blue-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                           <FileText className="w-5 h-5" />
                         </div>
                         <div className="min-w-0">
                           <p className="text-sm font-bold text-white truncate">{f.name}</p>
                           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Shared by {f.sender} • {f.size}</p>
                         </div>
                      </div>
                      <button onClick={() => handleDownload(f)} className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition-colors shrink-0">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Notes Tab */}
            {activeTab === 'ai' && (
              <div className="flex-1 p-6 relative flex flex-col">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-500/20 to-transparent pointer-events-none" />
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
                     <BrainCircuit className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                     <div>
                       <h3 className="text-sm font-bold text-white mb-2">Live Transcription & Summary</h3>
                       <p className="text-xs text-indigo-200 leading-relaxed">
                         Our AI analyzes your session chat to generate a neat summary of key takeaways and homework when you request it.
                       </p>
                     </div>
                  </div>

                  <button 
                    onClick={generateSummary}
                    disabled={isGenerating}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold tracking-wide transition-colors disabled:opacity-50"
                  >
                    {isGenerating ? "Analyzing Session..." : "Generate AI Summary"}
                  </button>

                  <div className="p-4 bg-slate-800 rounded-2xl border border-white/5 space-y-4">
                     <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-indigo-500 animate-pulse' : 'bg-green-500'}`} /> 
                       {isGenerating ? 'Generating...' : 'Summary Output'}
                     </h4>
                     <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{aiSummary}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Recordings Tab */}
            {activeTab === 'recordings' && (
              <div className="flex-1 p-6">
                 <div className="mb-6 space-y-2">
                  <h3 className="text-white font-bold">Past Session Playbacks</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Access full recordings, AI summaries, and whiteboard exports from your previous sessions with Mr. Sipho.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { date: '12 Oct 2023', duration: '1h 15m', title: 'Algebraic Fractions & Inequalities' },
                    { date: '05 Oct 2023', duration: '55m', title: 'Simultaneous Linear Equations' },
                    { date: '28 Sep 2023', duration: '1h 05m', title: 'Intro to Functions' }
                  ].map((rec, idx) => (
                     <div key={idx} className="p-4 bg-slate-800 border border-white/5 rounded-2xl group hover:border-indigo-500/30 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                           <div className="min-w-0 pr-4">
                              <h4 className="text-sm font-bold text-white truncate group-hover:text-indigo-400 transition-colors">{rec.title}</h4>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{rec.date} • {rec.duration}</p>
                           </div>
                           <button className="w-8 h-8 rounded-full bg-slate-700 flex flex-shrink-0 items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                              <Play className="w-4 h-4 ml-0.5" />
                           </button>
                        </div>
                        <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                           <button className="flex-1 py-2 bg-slate-900 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2">
                             <BrainCircuit className="w-3 h-3" /> AI Summary
                           </button>
                           <button className="flex-1 py-2 bg-slate-900 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2">
                             <Download className="w-3 h-3" /> Whiteboard
                           </button>
                        </div>
                     </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default VirtualClassroom;
