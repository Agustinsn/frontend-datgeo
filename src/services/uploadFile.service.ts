const typeNumber: Record<string, number> = {
  dni: 1,
  license: 2,
  cv: 3,
};


export const uploadFile = async (file: File,type:"dni" | "license" | "cv"): Promise<string | null> => {
    if (!file || file.type !== "application/pdf") {
      console.error("Seleccione un archivo PDF.");
      return null;
    }
  
    try {
      const response = await fetch(
        `http://localhost:3000/s3/upload-url?fileName=${encodeURIComponent(file.name)}&contentType=${file.type}`
      );
      const data = await response.json();
  
      if (!data.url) {
        throw new Error("No se recibió una URL de subida.");
      }

      await fetch(data.url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      console.log("Archivo PDF subido correctamente a S3.");

      const document = {
        path:data.url,
        name:file.name,
        type: typeNumber[type],
        is_active:false
      }

      const responseDoc = await fetch("http://localhost:3000/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(document),
      });

      const responseDocData = await responseDoc.json();
      return responseDocData.id;
    } catch (error) {
      console.error("Error subiendo el archivo a S3:", error);
      return null;
    }
  };
  