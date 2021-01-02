module.exports = {
  mascotas: [
    { tipo: "Perro", nombre: "Firulais", dueno: "Juan Gomez" },
    { tipo: "Gato", nombre: "Toto", dueno: "Camila Sanchez" },
    { tipo: "Perro", nombre: "Negro", dueno: "Raúl Perez" },
    { tipo: "Perro", nombre: "Kiki", dueno: "Rene Gomez" },
    { tipo: "Conejo", nombre: "Felipe", dueno: "Isabel Miranda" },
  ],
  veterinarios: [
    { nombre: "Alex", apellido: "Perez", documento: "1234567890" },
    { nombre: "Silvia", apellido: "Gómez", documento: "4234569999" },
    { nombre: "Julián", apellido: "Esquivel", documento: "555666777" },
    { nombre: "Natalia", apellido: "Cordoba", documento: "1000666777" },
  ],
  duenos: [
    { nombre: "Alejandra", apellido: "Ramirez", documento: "12343333890" },
    { nombre: "Alexandra", apellido: "Fernandez", documento: "4234564321" },
    { nombre: "Julio", apellido: "Perez", documento: "456666777" },
    { nombre: "Natalia", apellido: "Gonzales", documento: "9000666777" },
  ],
  consultas: [
    {
      mascota: 0,
      veterinaria: 0,
      fechaCreacion: new Date(),
      diagnostico: "diagnostico",
    },
  ],
};
