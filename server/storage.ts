// File storage helper.
//
// The Manus storage proxy has been removed. Uploads are not wired up in the
// public-first build. Callers (e.g. the statement-review form) already handle
// a thrown error gracefully by recording the lead without the attachment.
//
// Phase 2: connect an S3/R2 bucket here — the project already has
// @aws-sdk/client-s3 available and a Cloudflare R2 bucket (ubc-media).

const NOT_CONFIGURED =
  "File storage is not configured. Connect an S3/R2 bucket to enable uploads.";

export async function storagePut(
  _relKey: string,
  _data: Buffer | Uint8Array | string,
  _contentType = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  throw new Error(NOT_CONFIGURED);
}

export async function storageGet(
  _relKey: string
): Promise<{ key: string; url: string }> {
  throw new Error(NOT_CONFIGURED);
}
