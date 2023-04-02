import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'


const GET_MEDICAMENTOS = gql`
  query Medicamentos {
    refes {
      ref
      ativo
      medicamentosSimilares {
        sim
        conc
        form
      }
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(GET_MEDICAMENTOS)

  const [medicamentosSimilares, setMedicamentosSimilares] = useState([])
  const [selectedMed, setSelectedMed] = useState(null)

  const handleSelectMed = (e) => {
    const ref = e.target.value
    const medicamento = data.refes.find((med) => med.ref === ref)
    setMedicamentosSimilares(medicamento.medicamentosSimilares)
    setSelectedMed(medicamento)
  }

  return (
    <div>
      <h1 class="center-align">Medicamentos Referência e Similares</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar os medicamentos</p>}
      {data && (
        <>
          <select onChange={handleSelectMed} class="browser-default">
            <option value="">Click e Selecione um Medicamento de Referência</option>
            {data.refes.map((med) => (
              <option key={med.ref} value={med.ref}>
                {med.ref}
              </option>
            ))}
          </select>
          {selectedMed && (
            <>
              <h3 class="blue-text text-darken-2" >{selectedMed.ref}</h3>
              <p class="flow-text"><span  class="bold-text">Principio Ativo:</span> {selectedMed.ativo}</p>
              <table class="striped">
                <thead>
                  <tr>
                    <th>Medicamento Similar</th>
                    <th>Concentração</th>
                    <th>Formato</th>
                  </tr>
                </thead>
                <tbody>
                  {medicamentosSimilares.map((medSim) => (
                    <tr key={`${medSim.sim}-${medSim.conc}-${medSim.form}`}>
                      <td>{medSim.sim}</td>
                      <td>{medSim.conc}</td>
                      <td>{medSim.form}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default App
