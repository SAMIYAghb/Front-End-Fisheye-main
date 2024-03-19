
// api.js
class Api {
  constructor(url) {
    this.url = url;
  }

  async get() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error("La réponse du réseau n'est pas correcte");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  }
}

export default Api;
