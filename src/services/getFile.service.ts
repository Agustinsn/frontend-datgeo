export const getFile= async (fileName: string): Promise<Blob | null> => {
    try {
      const response = await fetch(
        `http://localhost:3000/s3/download-url?fileName=${encodeURIComponent(fileName)}`
      );
  
      const data = await response.json();
      if (!data.url) {
        throw new Error("No se recibió una URL de descarga.");
      }

      const fileResponse = await fetch(data.url);
      if (!fileResponse.ok) {
        throw new Error("Error al descargar el archivo.");
      }
  
      return await fileResponse.blob();
    } catch (error) {
      console.error("Error obteniendo el archivo de S3:", error);
      return null;
    }
  };
  