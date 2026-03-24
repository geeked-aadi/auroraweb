const WHATSAPP_NUMBER = "916361388923";

export const createWhatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const requiredFields = `Name:
Phone:
Preferred Date:
Preferred Time:`;

export const bookingMessage = (context: string) =>
  `Hi Aurora Studio! I would like to book ${context}.

${requiredFields}
Additional Details:`;

export const offerClaimMessage = (offerTitle: string) =>
  `Hi Aurora Studio! I want to claim this offer: ${offerTitle}.

${requiredFields}
Anything specific you want from this offer:`;

export const enrollMessage = (courseName: string) =>
  `Hi Aurora Academy! I want to enroll for: ${courseName}.

${requiredFields}
Education/Experience:
Questions:`;

export const generalInquiryMessage = () =>
  `Hi Aurora Studio! I would like more information.

${requiredFields}
Service/Course Interested In:`;
