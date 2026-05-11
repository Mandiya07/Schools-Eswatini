import { AcademicResource } from "../../types";

export const requestEMaliPay = async (resource: AcademicResource, phoneNumber: string) => {
  const res = await fetch("/api/emali/request-to-pay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ resource, phoneNumber }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to initiate eMali payment");
  }

  return res.json(); // { referenceId, status }
};

export const checkEMaliStatus = async (referenceId: string) => {
  const res = await fetch(`/api/emali/status/${referenceId}`);
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to check eMali payment status");
  }

  return res.json(); // { status: "SUCCESSFUL" | "FAILED" | "PENDING" }
};
