/**
 * Auth API Service
 * Handles custom authentication routes in Strapi (Forgot Password flow)
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/**
 * Helper to handle fetch responses and extract error messages
 */
async function handleResponse(res: Response) {
  const data = await res.json();
  if (!res.ok) {
    // Strapi v5 error format: { error: { message: '...' } }
    const message = data.error?.message || data.message || 'An unexpected error occurred';
    throw new Error(message);
  }
  return data;
}

export const authApi = {
  /**
   * Request an OTP for password reset
   */
  async forgotPassword(email: string) {
    const res = await fetch(`${STRAPI_URL}/api/otp-store/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return handleResponse(res);
  },

  /**
   * Verify the OTP and receive a reset token
   */
  async verifyOtp(email: string, otp: string) {
    const res = await fetch(`${STRAPI_URL}/api/otp-store/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    return handleResponse(res);
  },

  /**
   * Reset the password using the reset token
   */
  async resetPassword(resetToken: string, newPassword: string) {
    const res = await fetch(`${STRAPI_URL}/api/otp-store/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resetToken, newPassword }),
    });
    return handleResponse(res);
  },
};
