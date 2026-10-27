/* Serialise an object for an inline <script type="application/ld+json"> block.

   JSON.stringify alone leaves "<" as-is, so a string containing a closing script tag would end
   the script element early and let whatever follows run as HTML. Escaping "<" (and the two Unicode
   line-separator characters, legal in JSON but troublesome in older JS parsers) as unicode
   escapes keeps the output identical as JSON while making it impossible to break out of the tag.
   Today all of this content is static and written by us, so this is hardening, not a live hole —
   but FAQ and service copy is easy to paste into later, and it costs nothing. */

// Built from char codes rather than written as escape sequences in the source, which some
// editors and tools silently turn into real line-separator characters and break the file.
const LINE_SEPARATOR = String.fromCharCode(0x2028);
const PARAGRAPH_SEPARATOR = String.fromCharCode(0x2029);
const BACKSLASH = String.fromCharCode(92);

export function jsonLd(data) {
  return JSON.stringify(data)
    .replace(/</g, BACKSLASH + 'u003c')
    .split(LINE_SEPARATOR).join(BACKSLASH + 'u2028')
    .split(PARAGRAPH_SEPARATOR).join(BACKSLASH + 'u2029');
}
