"use client"
import { useProduct } from "@/app/context/ProductContext"
import { useUser } from "@/app/context/UserContext"
import { ChangeEvent, useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import toast from "react-hot-toast"

interface User {
  id: string
  name: string
  username: string
  password: string
  user_type: string
  email: string
  status: string
}

interface Product {
  id: string
  reference: string
  name: string
  brand: string
  model: string
  quantity: number
  unit_type: string
  cost_price: number
  sales_price: number
  image_product: string[]
}

function UploadBackup() {
  const [showModalUpload, setShowModalUpload] = useState(false)
  const handleShowModalUpload = () => setShowModalUpload(true)
  const handleCloseModalUpload = () => {
    setShowModalUpload(false)
    setUploadedFiel({
      users: [],
      products: []
    })
  }
  const [uploadedFile, setUploadedFiel] = useState<{
    users: User[],
    products: Product[]
  }>()

  const {userBackup, editUser, deleteUser} = useUser()
  const {productBackup, editProduct, deleteProduct} = useProduct()

  const handleUploadFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if (file) {
      const reader = new FileReader()
      reader.onload = function(event) {
        const jsonString = event.target?.result
        try {
          const jsonObject = JSON.parse(jsonString!.toString())
          console.log('Objeto JSON:', jsonObject)
          setUploadedFiel(jsonObject)
          toast.success("JSON convertido a objeto. Revisa la consola para más detalles.")
        } catch (error) {
          console.error('Error al convertir JSON:', error)
          toast.error("Error al convertir JSON. Asegúrate de que el archivo es un JSON válido.")
        }
      }
      reader.readAsText(file)
    } else {
        toast.error("Por favor, selecciona un archivo JSON.")
    }
  }

  const handleUploadButton = async () => {
    const users = await userBackup()
    const products = await productBackup()

    try {
      for (const user in users) {
        deleteUser(users[user].id)
      }
  
      for (const product in products) {
        deleteProduct(products[product].id)
      }
  
      for (const user in uploadedFile!.users) {
        editUser({
          id: uploadedFile!.users[user].id,
          name: uploadedFile!.users[user].name,
          username: uploadedFile!.users[user].username,
          password: uploadedFile!.users[user].password,
          userType: uploadedFile!.users[user].user_type,
          email: uploadedFile!.users[user].email,
          status: uploadedFile!.users[user].status
        })
      }
  
      for (const product in uploadedFile!.products) {
        editProduct({
          id: uploadedFile!.products[product].id,
          reference: uploadedFile!.products[product].reference,
          name: uploadedFile!.products[product].name,
          brand: uploadedFile!.products[product].brand,
          model: uploadedFile!.products[product].model,
          quantity: uploadedFile!.products[product].quantity,
          unit_type: uploadedFile!.products[product].unit_type,
          cost_price: uploadedFile!.products[product].cost_price,
          sales_price: uploadedFile!.products[product].sales_price,
          image_product: uploadedFile!.products[product].image_product
        })
      }
      toast.success("Respaldo cargado exitosamente.")
      handleCloseModalUpload()
    } catch (error) {
      console.log(error)
        toast.error("Problema al intertar cargar el respaldo: " + error)
    }
  }

  return (
    <>
      <button className="dropdown-item" onClick={handleShowModalUpload}>Cargar Respaldo</button>
      <Modal show={showModalUpload} onHide={handleCloseModalUpload}>
        <Modal.Header closeButton>
          <Modal.Title>Cargar Tablas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input className="form-control" onChange={handleUploadFileInput} type="file" name="" id="" />
          {uploadedFile?.users.length! > 0 &&
            <table className="table table-hover align-middle table-borderless mt-3">
              <thead className="">
                <tr>
                  <th scope="col">Tabla</th>
                  <th scope="col">Nro. Registros</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Usuarios</td>
                  <td>{uploadedFile?.users.length}</td>
                </tr>
                <tr>
                  <td>Productos</td>
                  <td>{uploadedFile?.products.length}</td>
                </tr>
              </tbody>
            </table>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalUpload}>Cerrar</Button>
          <Button variant="primary" onClick={handleUploadButton}>Cargar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UploadBackup