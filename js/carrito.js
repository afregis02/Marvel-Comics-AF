const carritoApp = Vue.createApp({
  data() {
    return {
      carrito: JSON.parse(localStorage.getItem('carrito')) || [], // Inicializa el carrito como un arreglo vacío si no hay datos
    };
  },
  computed: {
    subtotal() {
      return this.carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0).toFixed(2);
    },
    
    iva() {
      return (this.subtotal * 0.16).toFixed(2); // Corrige el cálculo del IVA
    },
    
    total() {
      return (parseFloat(this.subtotal) + parseFloat(this.iva)).toFixed(2); // Corrige el cálculo del total
    },
    
    totalArticulos() {
      return this.carrito.reduce((acc, item) => acc + item.cantidad, 0);
    },
  },
  methods: {
    actualizarCantidad(item) {
      // Asegúrate de que las cantidades estén dentro del rango permitido
      if (item.cantidad < 1) item.cantidad = 1;
      if (item.cantidad > 10) item.cantidad = 10;

      // Guarda el carrito actualizado en localStorage
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    },
    
    calcularImporte(item) {
      return (item.price * item.cantidad).toFixed(2);
    },
  },
});

// Monta la aplicación de Vue en el elemento con ID "carritoApp"
carritoApp.mount('#carritoApp');