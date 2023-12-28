type StripOptions = {
  removeEmojis: boolean;
  removeEmoticons: boolean;
};

export default function stripEmojis(text: string, options:  StripOptions): string {
  let result = text;

  // set default options for removeEmojis and removeEmoticons
  if (options.removeEmojis === undefined) {
      options.removeEmojis = true;
  }

  if (options.removeEmojis) {
      const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}\u{2B55}\u{2E80}-\u{2E99}\u{2E9B}-\u{2EF3}\u{2F00}-\u{2FD5}\u{2FF0}-\u{2FFB}\u{3000}-\u{303F}\u{3040}-\u{309F}\u{30A0}-\u{30FF}\u{3100}-\u{312F}\u{3130}-\u{318F}\u{3190}-\u{319F}\u{31A0}-\u{31BF}\u{31C0}-\u{31EF}\u{31F0}-\u{31FF}\u{3200}-\u{32FF}\u{3300}-\u{33FF}\u{3400}-\u{4DBF}\u{4E00}-\u{9FFF}\u{A000}-\u{A48C}\u{A490}-\u{A4C6}\u{AC00}-\u{D7A3}]/gu;
      result = result.replace(emojiRegex, '');
  }

  if (options.removeEmoticons) {
      const emoticonRegex = /(:\)|;\)|:\(|:\D|:P|:\||:\*|:'\(|:'\)|<3|\^_\^|>\.<|T_T)/g;
      result = result.replace(emoticonRegex, '');
  }

  return result;
}
