/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * ClassMate backend
 * ClasssMate backend
 * OpenAPI spec version: 1.0
 */

export interface ChatMessageContent {
  visible: boolean;
  content?: string;
  /** Path of the image inside the `files` bucket. The `files` bucket has permissions setup in such a way
that user can upload files to it directly and view it's own files. See [supabase docs](https://supabase.com/docs/guides/storage)
for more information on how to do that. One of `content` or `image_path` has to be not `null`.
 */
  image_path?: string;
  /** Base64 encoded image. Utilized when client wants to send images that are base64 encoded in the first place (e.g. screenshots).
just passed directly to the OpenAI API. Image should start with `data:image/` prefix. Example of a full prefix before base64 encoded image: `data:image/jpeg;base64,`
 */
  base64_image?: string;
}
