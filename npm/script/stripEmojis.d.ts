/**
 * Configuration options for text stripping functionality
 */
export interface StripOptions {
    /**
     * Remove Unicode emojis when true
     * @default true
     */
    removeEmojis?: boolean;
    /**
     * Preserve specified emojis/emoticons
     * @default []
     */
    preserve?: string[];
    /**
     * Replace stripped content with this string
     * @default ''
     */
    replaceWith?: string;
}
/**
 * Strips emojis and/or emoticons from text based on provided options
 */
export declare function stripEmojis(text: string, options?: StripOptions): string;
//# sourceMappingURL=stripEmojis.d.ts.map