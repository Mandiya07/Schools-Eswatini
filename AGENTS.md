# Schools Eswatini - Agent Instructions

## Architecture Overview
- **Frontend**: React 19 + Vite + Tailwind CSS + motion/react.
- **Backend**: Express + Socket.IO for real-time collaboration and classroom features.
- **Database**: Firestore (Enterprise Edition) with ABAC security rules.
- **Payments**: Integrated MTN MoMo and eMali mock endpoints.

## Tech Stack Details
- **Real-time**: use `socket.io-client` in classroom components and `server.ts` for signaling.
- **Geography**: use `react-leaflet` for regional school mapping.
- **Analytics**: use `recharts` for performance tracking.

## Implementation Notes
- **Firestore Security**: Rules follow the "Eight Pillars" pattern. Always use `isValid[Entity]` helpers for writes.
- **Resource Marketplace**: Resources are fetched via `resourceService.ts`. Purchases create a `Transaction` document.

## Known Issues
- **Firebase Provisioning**: The platform has returned permission errors during Firestore setup (`ENABLE_FIREBASE_API_TASK`). The configuration in `firebase-applet-config.json` remains as a fallback until provisioning succeeds.
