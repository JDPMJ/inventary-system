"use client"
import { createContext, useContext, useState } from "react"
import { db } from "@/config/firebase"
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore"

interface Product {
  id?: string
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

export const ProductContext = createContext<{
  products: any[]
  addProduct: (product: Product) => Promise<void>
  loadProduct: (id: string) => Promise<void>
  loadProducts: (name: string) => Promise<void>
  editProduct: (product: Product) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  productBackup: () => Promise<any>
}>({
  products: [],
  addProduct: async (product: Product) => {},
  loadProduct: async (id: string) => {},
  loadProducts: async (name: string) => {},
  editProduct: async (product: Product) => {},
  deleteProduct: async (id: string) => {},
  productBackup: async () => {}
})

export const useProduct = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider")
  }
  return context
}

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<any[]>([])

  async function loadProducts(name: string) {
    const res = await getDocs(collection(db, "products"))
    const data = res.docs.map((product) => Object({id: product.id, ...product.data()}))
    if (name == "") {
      setProducts(data)
      console.log(data)
    } else {
      const exp = new RegExp(`${name}.*`, "i")
      const filteredData = data.filter(product => exp.test(product.name))
      setProducts(filteredData)
    }
  }

  async function loadProduct(id: string) {
    const data = await getDoc(doc(db, "products", id))
    setProducts([{ id: id, ...data.data() }])
    console.log(data)
  }

  async function addProduct(product: Product) {
    console.log("Agregando producto")
    const newIdProduct = doc(collection(db, "products"))
    await setDoc(newIdProduct, {
      reference: product.reference,
      name: product.name,
      brand: product.brand,
      model: product.model,
      quantity: product.quantity,
      unit_type: product.unit_type,
      cost_price: product.cost_price,
      sales_price: product.sales_price,
      image_product: product.image_product
    })
    loadProducts("")
  }

  async function deleteProduct(id: string) {
    const res = await deleteDoc(doc(db, "products", id))
    console.log(res)
    loadProducts("")
  }

  async function editProduct(product: Product) {
    const res = await setDoc(doc(db, "products", product.id!), {
      reference: product.reference,
      name: product.name,
      brand: product.brand,
      model: product.model,
      quantity: product.quantity,
      unit_type: product.unit_type,
      cost_price: product.cost_price,
      sales_price: product.sales_price,
      image_product: product.image_product
    })
    console.log(res)
    loadProducts("")
  }

  async function productBackup() {
    const res = await getDocs(collection(db, "products"))
    const data = res.docs.map((product) => Object({id: product.id, ...product.data()}))
    return data
  }

  return <ProductContext.Provider value={{ products, addProduct, loadProduct, loadProducts, editProduct, deleteProduct, productBackup }}>
    {children}
  </ProductContext.Provider>
}