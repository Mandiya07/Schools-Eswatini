import { AcademicResource } from '../../types';

export interface MomoResponse {
  referenceId: string;
  status: 'pending' | 'SUCCESSFUL' | 'FAILED' | 'REJECTED';
}

export async function requestToPay(resource: AcademicResource, phoneNumber: string): Promise<MomoResponse> {
  const response = await fetch('/api/momo/request-to-pay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ resource, phoneNumber }),
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data;
}

export async function checkPaymentStatus(referenceId: string): Promise<any> {
  const response = await fetch(`/api/momo/status/${referenceId}`);
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data;
}
