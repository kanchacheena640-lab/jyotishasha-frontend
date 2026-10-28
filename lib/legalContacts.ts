/**
 * F10-P19 -- one source for published contact details on the legal pages.
 *
 * BUSINESS_SUPPORT is Jyotishasha's general customer-support contact, exactly
 * as already published on the Contact page, footer and policies. It is NOT the
 * Grievance Officer's personal contact.
 *
 * GRIEVANCE_OFFICER is owner-confirmed (F10-P19): name, designation and email
 * only. No officer phone or address has been provided, so none is shown.
 */
export const BUSINESS_SUPPORT = {
  email: "support@jyotishasha.com",
  phone: "+91 9118877495",
  phoneHref: "tel:+919118877495",
  addressLines: ["Gomti Nagar", "Lucknow, India", "Pin: 226010"],
} as const;

export const GRIEVANCE_OFFICER = {
  name: "Shiksha Sharma",
  designation: "Grievance Officer",
  email: "support@jyotishasha.com",
} as const;

/** Legacy secondary privacy contact, kept by owner decision (F10-P19). */
export const LEGACY_PRIVACY_EMAIL = "jraviom@gmail.com";
