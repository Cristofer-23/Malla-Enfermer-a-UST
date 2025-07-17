const cursos = [
  { id: "razonamiento", nombre: "Razonamiento lógico matemático", prerequisitos: [], semestre: "1°" },
  { id: "quimica", nombre: "Química", prerequisitos: [], semestre: "1°" },
  { id: "biocel", nombre: "Biología Celular", prerequisitos: [], semestre: "1°" },
  { id: "basesDisc", nombre: "Bases disciplinares para el cuidado de enfermería", prerequisitos: [], semestre: "1°" },
  { id: "comunicativas", nombre: "Taller de competencias comunicativas", prerequisitos: [], semestre: "1°" },
  { id: "aprendizaje", nombre: "Taller de competencias para el aprendizaje", prerequisitos: [], semestre: "1°" },
  { id: "perso1", nombre: "Taller de desarrollo personal 1", prerequisitos: [], semestre: "1°" },
  { id: "crecDes", nombre: "Crecimiento y desarrollo", prerequisitos: [], semestre: "2°" },
  { id: "bioquimica", nombre: "Bioquímica", prerequisitos: ["quimica", "biocel"], semestre: "2°" },
  { id: "fundAnat", nombre: "Fundamentos anatómicos para el cuidado", prerequisitos: [], semestre: "2°" },
  { id: "basesAPS", nombre: "Bases de Enfermería en APS", prerequisitos: ["basesDisc"], semestre: "2°" },
  { id: "auxilios", nombre: "Taller de primeros auxilios", prerequisitos: [], semestre: "2°" },
  { id: "perso2", nombre: "Taller de desarrollo personal 2", prerequisitos: [], semestre: "2°" },
  { id: "valores", nombre: "Cultura y valores", prerequisitos: [], semestre: "2°" },
  { id: "farmaco", nombre: "Farmacología", prerequisitos: ["bioquimica"], semestre: "3°" },
  { id: "fisio", nombre: "Fisiología", prerequisitos: ["fundAnat"], semestre: "3°" },
  { id: "microbio", nombre: "Microbiología y parasitología clínica", prerequisitos: ["biocel"], semestre: "3°" },
  { id: "fundPro", nombre: "Fundamentos del proceso de enfermería", prerequisitos: ["basesDisc", "fundAnat"], semestre: "3°" },
  { id: "sentido", nombre: "Persona y sentido", prerequisitos: [], semestre: "3°" },
  { id: "estadistica", nombre: "Estadísticas para ciencias de la salud", prerequisitos: [], semestre: "3°" },
  { id: "saludPub", nombre: "Fundamentos en salud pública", prerequisitos: ["estadistica"], semestre: "4°" },
  { id: "fisiopato", nombre: "Bases fisiopatológicas para el cuidado", prerequisitos: ["fisio"], semestre: "4°" },
  { id: "educaSalud", nombre: "Intervenciones educativas en salud", prerequisitos: [], semestre: "4°" },
  { id: "gestionSaludMental", nombre: "Gestión del cuidado en salud mental", prerequisitos: ["fundPro"], semestre: "4°" },
  { id: "procEnfer", nombre: "Proceso de enfermería", prerequisitos: ["fundPro"], semestre: "4°" },
  { id: "ingles1", nombre: "Inglés básico 1", prerequisitos: [], semestre: "4°" },
  { id: "gestionSalud", nombre: "Gestión en salud", prerequisitos: [], semestre: "5°" },
  { id: "gdcAdultoMayor", nombre: "Gestión del cuidado en adulto mayor", prerequisitos: ["fisiopato", "procEnfer", "gestionSaludMental"], semestre: "5°" },
  { id: "gdcFamilia", nombre: "Gestión del cuidado en la familia en APS", prerequisitos: ["fisiopato", "procEnfer", "gestionSaludMental"], semestre: "5°" },
  { id: "gdcHospMedico", nombre: "GDC en adulto y adulto mayor hospitalizado médico", prerequisitos: [], semestre: "5°" },
  { id: "ingles2", nombre: "Inglés básico 2", prerequisitos: ["ingles1"], semestre: "5°" },
  { id: "gestionCuidado", nombre: "Gestión del cuidado", prerequisitos: ["gestionSalud"], semestre: "6°" },
  { id: "gdcAPS", nombre: "GDC en adulto y adulto mayor en APS", prerequisitos: ["gdcAdultoMayor", "gdcFamilia"], semestre: "6°" },
  { id: "etica", nombre: "Ética en salud", prerequisitos: [], semestre: "6°" },
  { id: "gdcHospQuir", nombre: "GDC en adulto y adulto mayor hospitalizado quirúrgico", prerequisitos: [], semestre: "6°" },
  { id: "electivo1", nombre: "Electivo 1", prerequisitos: [], semestre: "6°" },
  { id: "metodologia", nombre: "Metodología de la investigación", prerequisitos: ["saludPub"], semestre: "7°" },
  { id: "cuidadosNino", nombre: "Fundamentos del cuidado en niño y adolescente hospitalizado", prerequisitos: ["gdcHospMedico", "gdcHospQuir"], semestre: "7°" },
  { id: "gestionNinoAPS", nombre: "Gestión del cuidado en niño y adolescente en APS", prerequisitos: ["gdcAPS"], semestre: "7°" },
  { id: "urgencias", nombre: "Fundamentos del cuidado en urgencias y desastres", prerequisitos: ["gdcHospMedico", "gdcHospQuir"], semestre: "7°" },
  { id: "electivo2", nombre: "Electivo 2", prerequisitos: [], semestre: "7°" },
  { id: "seminario", nombre: "Seminario de investigación", prerequisitos: ["metodologia"], semestre: "8°" },
  { id: "calidad", nombre: "Gestión de calidad y seguridad", prerequisitos: ["gestionCuidado"], semestre: "8°" },
  { id: "ninoHosp", nombre: "Gestión del cuidado en niño y adolescente hospitalizado", prerequisitos: ["cuidadosNino"], semestre: "8°" },
  { id: "promocion", nombre: "Promoción de la salud en organizaciones comunitarias", prerequisitos: ["gestionNinoAPS"], semestre: "8°" },
  { id: "urgencias2", nombre: "GDC en urgencias y desastres", prerequisitos: ["urgencias"], semestre: "8°" },
  { id: "electivo3", nombre: "Electivo 3", prerequisitos: [], semestre: "8°" },
  { id: "internado", nombre: "Internado", prerequisitos: cursos ? cursos.map(c => c.id).filter(id => id !== \"internado\") : [], semestre: "9° y 10°" }
];

const estado = {};
const contenedor = document.getElementById(\"malla-container\");

function puedeDesbloquear(ramo) {
  return ramo.prerequisitos.every(req => estado[req]);
}

function renderMalla() {
  contenedor.innerHTML = \"\";
  let ultimoSemestre = \"\";

  cursos.forEach(ramo => {
    if (ramo.semestre !== ultimoSemestre) {
      const separador = document.createElement(\"div\");
      separador.className = \"semestre\";
      separador.textContent = `📘 Semestre ${ramo.semestre}`;
      contenedor.appendChild(separador);
      ultimoSemestre = ramo.semestre;
    }

    const div = document.createElement(\"div\");
    div.className = \"ramo\";
    div.textContent = ramo.nombre;

    if (estado[ramo.id]) {
      div.classList.add(\"aprobado\");
    } else if (!puedeDesbloquear(ramo)) {
      div.classList.add(\"bloqueado\");
    }

    div.addEventListener(\"click\", () => {
      if (!puedeDesbloquear(ramo) || estado[ramo.id]) return;
      estado[ramo.id] = true;
      renderMalla();
    });

    contenedor.appendChild(div);
  });
}

renderMalla();
