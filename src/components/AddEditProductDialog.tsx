"use client"
import { useProduct } from "@/providers/ProductContext"
import { ChangeEvent, useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import toast from "react-hot-toast"

interface Props {
  variant: string
  product?: {
    id: string
    reference: string
    name: string
    brand: string
    model: string
    quantity: number
    unit_type: string
    cost_price: number
    sales_price: number
    image_product: []
  }
}

function AddEditProductDialog({ variant, product }: Props) {
  const {addProduct, editProduct} = useProduct()

  const [productForm, setProductForm] = useState({
    reference: "",
    name: "",
    brand: "",
    model: "",
    quantity: "",
    unit_type: "",
    cost_price: "",
    sales_price: "",
    image_product: []
  })

  const [renderProductModal, setRenderProductModal] = useState(false)
  const [showModalProduct, setShowModalProduct] = useState(false)
  const handleShowModalProduct = () => {
    setRenderProductModal(true)
    setShowModalProduct(true)
  }
  const handleCloseModalProduct = () => {
    setShowModalProduct(false)
    setTimeout(() => setRenderProductModal(false), 300)
  }
  const [modalTitle, setModalTitle] = useState("")
  const [buttonName, setButtonName] = useState("")
  const [buttonStyle, setButtonStyle] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    
}

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "cost_price" || e.target.name == "sales_price" || e.target.name == "quantity") {
      let inputValue = e.target.value
      inputValue = inputValue.replace(/\./g, '').replace(/,/g, '.')
      if (!isNaN(parseFloat(inputValue)) && inputValue !== '') {
        let parts = inputValue.split('.')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        setProductForm({ ...productForm, [e.target.name]: parts.join(',') })
      } else {
        setProductForm({ ...productForm, [e.target.name]: inputValue })
      }
    } else {
      setProductForm({ ...productForm, [e.target.name]: e.target.value })
    }
  }

  const onClickHandler = async () => {
    if (variant == "add") {
      try {
        await addProduct({
          id: "",
          reference: productForm.reference,
          name: productForm.name,
          brand: productForm.brand,
          model: productForm.model,
          quantity: parseFloat(productForm.quantity),
          unit_type: productForm.unit_type,
          cost_price: parseFloat(productForm.cost_price),
          sales_price: parseFloat(productForm.sales_price),
          image_product: []
        })
        toast.success("Producto agregado exitosamente")
        setProductForm({
          reference: "",
          name: "",
          brand: "",
          model: "",
          quantity: "",
          unit_type: "",
          cost_price: "",
          sales_price: "",
          image_product: []
        })
        handleCloseModalProduct()
      } catch (error) {
        console.log(error)
        toast.error("Problema al intertar regitrar el producto: " + error)
      }
    } else {
      try {
        await editProduct({
          id: product!.id,
          reference: productForm.reference,
          name: productForm.name,
          brand: productForm.brand,
          model: productForm.model,
          quantity: parseFloat(productForm.quantity),
          unit_type: productForm.unit_type,
          cost_price: parseFloat(productForm.cost_price),
          sales_price: parseFloat(productForm.sales_price),
          image_product: []
        })
        toast.success("Producto editado exitosamente")
        setProductForm({
          reference: "",
          name: "",
          brand: "",
          model: "",
          quantity: "",
          unit_type: "",
          cost_price: "",
          sales_price: "",
          image_product: []
        })
        handleCloseModalProduct()
      } catch (error) {
        console.log(error)
        toast.error("Problema al intertar editar el producto: " + error)
      }
    }
  }

  const initState = () => {
    if (variant == "add") {
      setModalTitle("Agregar Producto")
      setButtonName("Agregar")
      setButtonStyle("primary")
      //document.getElementById("status")?.click()
    } else {
      setModalTitle("Editar Producto")
      setButtonName("Editar")
      setButtonStyle("warning")

      setProductForm({
        reference: product!.reference,
        name: product!.name,
        brand: product!.brand,
        model: product!.model,
        quantity: new Intl.NumberFormat("ve-ES", { maximumFractionDigits: 2 }).format(product!.quantity),
        unit_type: product!.unit_type,
        cost_price: new Intl.NumberFormat("ve-ES", { maximumFractionDigits: 2 }).format(product!.cost_price),
        sales_price: new Intl.NumberFormat("ve-ES", { maximumFractionDigits: 2 }).format(product!.sales_price),
        image_product: product!.image_product
      })
      console.log("Renderizando")
    }
  }

  useEffect(() => {
    initState()
  }, [renderProductModal])

  return (
    <>
      <Button variant={buttonStyle} onClick={handleShowModalProduct}>{buttonName}</Button>
      {renderProductModal &&
        <div>
          <Modal show={showModalProduct} onHide={handleCloseModalProduct}>
            <Modal.Header closeButton>
              <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="">
                <div className="mb-3">
                  <label htmlFor="reference">Referencia</label>
                  <input type="text" id="reference" value={productForm.reference} name="reference" className="form-control" placeholder="Ingrese la referencia" onChange={onChangeHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="name">Producto</label>
                  <input type="text" id="name" value={productForm.name} name="name" className="form-control" placeholder="Ingrese el nombre del producto" onChange={onChangeHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="brand">Marca</label>
                  <input type="text" id="brand" value={productForm.brand} name="brand" className="form-control" placeholder="Ingrese la marca" onChange={onChangeHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="model">Modelo</label>
                  <input type="text" id="model" value={productForm.model} name="model" className="form-control" placeholder="Ingrese el modelo" onChange={onChangeHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="quantity">Cantidad</label>
                  <input type="text" id="quantity" value={productForm.quantity} name="quantity" className="form-control text-end" placeholder="0,00" onChange={onChangeHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="unit_type">Unidad</label>
                  <input type="text" id="unit_type" value={productForm.unit_type} name="unit_type" className="form-control" placeholder="UND..." onChange={onChangeHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="cost_price">Costo</label>
                  <input type="text" id="cost_price" value={productForm.cost_price} name="cost_price" className="form-control text-end" placeholder="0,00" onChange={onChangeHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="sales_price">Precio</label>
                  <input type="text" id="sales_price" value={productForm.sales_price} name="sales_price" className="form-control text-end" placeholder="0,00" onChange={onChangeHandler} />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModalProduct}>Cerrar</Button>
              <Button variant={buttonStyle} onClick={onClickHandler}>{buttonName}</Button>
            </Modal.Footer>
          </Modal>
        </div>
      }
    </>
  )
}

export default AddEditProductDialog