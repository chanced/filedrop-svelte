/**
 * Check if the provided file type should be accepted by the input with accept attribute.
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#attr-accept
 *
 * Inspired by https://github.com/enyo/dropzone
 *
 * Original source: https://github.com/react-dropzone/attr-accept/blob/master/src/index.js
 * @param file {File} https://developer.mozilla.org/en-US/docs/Web/API/File
 * @param acceptedFiles {string}
 * @returns {boolean}
 */

export default function (file: File, acceptedFiles: string | string[]): boolean {
    if (!file || !acceptedFiles) {
        return true;
    }
    const acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(",");
    const fileName = file.name || "";
    const mimeType = (file.type || "").toLowerCase();
    const baseMimeType = mimeType.replace(/\/.*$/, "");

    return acceptedFilesArray.some((type) => {
        const validType = type.trim().toLowerCase();
        if (validType.charAt(0) === ".") {
            return fileName.toLowerCase().endsWith(validType);
        } else if (validType.endsWith("/*")) {
            // This is something like a image/* mime type
            return baseMimeType === validType.replace(/\/.*$/, "");
        }
        return mimeType === validType;
    });
}
