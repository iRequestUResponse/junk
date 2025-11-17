class CP949Encoder {
  #cp949Map;

  constructor() {
    const decoder = new TextDecoder("EUC-KR");
    const cp949Map = new Map();
    
    for (let byte1 = 0x81; byte1 <= 0xFE; byte1++) {
      for (let byte2 = 0x41; byte2 <= 0x5A; byte2++) {
        const byteArray = new Uint8Array([byte1, byte2]);
        const char = decoder.decode(byteArray);
        cp949Map.set(char, byteArray);
      }
      for (let byte2 = 0x61; byte2 <= 0x7A; byte2++) {
        const byteArray = new Uint8Array([byte1, byte2]);
        const char = decoder.decode(byteArray);
        cp949Map.set(char, byteArray);
      }
      for (let byte2 = 0x81; byte2 <= 0xFE; byte2++) {
        const byteArray = new Uint8Array([byte1, byte2]);
        const char = decoder.decode(byteArray);
        cp949Map.set(char, byteArray);
      }
    }

    this.#cp949Map = cp949Map;
  }
  
  encode(text) {
    return text.split("").map(char => {
      const byteArray = this.#cp949Map.get(char);

      if (byteArray) {
        return Array.from(byteArray);
      }

      const charCode = char.charCodeAt(0);

      if (charCode < 0x80) {
        return [charCode];
      }
      
      return [0x3F]; // "?" for unmapped characters
    }).flat();
  }
}