"use client"
import { useProduct } from "@/app/context/ProductContext"
import { ChangeEvent, useEffect } from "react"
import { Col, Form, Row } from "react-bootstrap"
import toast from "react-hot-toast"
import AddEditProductDialog from "./AddEditProductDialog"

/*interface User {
  name: string
  username: string
  password: string
  userType: string
  email: string
  status: string
}*/

function ProductTable() {
  const {products, loadProducts, deleteProduct} = useProduct()
  
  const handleClick = async (id: string) => {
    try {
      await deleteProduct(id)
      toast.success("Producto eliminado exitosamente")
    } catch (error) {
      console.log(error)
      toast.error("Problema al intertar eliminar el producto: " + error)
    }
  }

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      await loadProducts(e.target.value)
    } catch (error) {
      console.log(error)
      toast.error("Problema al intertar buscar el producto: " + error)
    }
  }
  
  useEffect(() => {
    loadProducts("")
  }, [])

  return (
    <div className="container">
      <div className="mt-5">
        <div className="mb-3">
          <Row>
            <Col><Form.Control type="text" placeholder="Buscar producto" onChange={handleSearch} /></Col>
            <Col><AddEditProductDialog variant="add" /></Col>
          </Row>
        </div>
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">Referencia</th>
              <th scope="col">Producto</th>
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Unidad</th>
              <th scope="col">Precio de Costo</th>
              <th scope="col">Precio de Venta</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id} className="">
                  <td>{product.reference}</td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.model}</td>
                  <td>{new Intl.NumberFormat("ve-ES", { maximumFractionDigits: 2 }).format(product.quantity)}</td>
                  <td>{product.unit_type}</td>
                  <td>{new Intl.NumberFormat("ve-ES", { maximumFractionDigits: 2 }).format(product.cost_price)}</td>
                  <td>{new Intl.NumberFormat("ve-ES", { maximumFractionDigits: 2 }).format(product.sales_price)}</td>
                  <td>
                    <button className="btn btn-danger mx-2" onClick={() => handleClick(product.id)}>Eliminar</button>
                    <AddEditProductDialog variant="edit" product={product} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductTable