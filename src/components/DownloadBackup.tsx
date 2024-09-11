"use client"
import { useProduct } from "@/providers/ProductContext"
import { useUser } from "@/providers/UserContext"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"

function DownloadBackup() {
  const [showModalDownload, setShowModalDownload] = useState(false)
  const handleShowModalDownload = () => setShowModalDownload(true)
  const handleCloseModalDownload = () => setShowModalDownload(false)

  const {users, userBackup, loadUsers} = useUser()
  const {products, productBackup, loadProducts} = useProduct()

  const download = async () => {
    const users = await userBackup()
    const products = await productBackup()
    const data = JSON.stringify({
      users: users,
      products: products
    })
    console.log(data)
    const blob = new Blob([data], { type: "application/json" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "backup.json"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadButton = () => {
    download()
    handleCloseModalDownload()
  }

  useEffect(() => {
    loadUsers("")
    loadProducts("")
  }, [showModalDownload])

  return (
    <>
      <button className="dropdown-item" onClick={handleShowModalDownload}>Descargar Respaldo</button>
      <Modal show={showModalDownload} onHide={handleCloseModalDownload}>
        <Modal.Header closeButton>
          <Modal.Title>Descargar Tablas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-hover align-middle table-borderless">
            <thead className="">
              <tr>
                <th scope="col">Tabla</th>
                <th scope="col">Nro. Registros</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Usuarios</td>
                <td>{users.length}</td>
              </tr>
              <tr>
                <td>Productos</td>
                <td>{products.length}</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalDownload}>Cerrar</Button>
          <Button variant="primary" onClick={handleDownloadButton}>Descargar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DownloadBackup