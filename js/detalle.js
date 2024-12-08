
  const app = Vue.createApp({
    data() {
      return {
        producto: {},
        cantidad: 1 
      };
    },
    created() {
      const productoSeleccionado = localStorage.getItem('productoSeleccionado');
      if (productoSeleccionado) {
        this.producto = JSON.parse(productoSeleccionado);
      } else {
        alert("No se encontró el producto seleccionado.");
        window.location.href = 'index.html'; // Redirige si no hay datos
      }
    },
    methods: {
      volver() {
        window.history.back(); // Regresa a la página anterior
      },
      modificarCantidad(incremento) {
        if (this.cantidad + incremento >= 1 && this.cantidad + incremento <= 6) {
          this.cantidad += incremento;
        }
      },


      agregarAlCarrito() {
        let productoCarrito = { 
            ...this.producto, 
            cantidad: this.cantidad 
        };
    
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const index = carrito.findIndex(item => item.id === productoCarrito.id);
        if (index >= 0) {
            carrito[index].cantidad += this.cantidad;
        } else {
            carrito.push(productoCarrito);
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        this.actualizarTotalCarrito();
    },
      actualizarTotalCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let totalArticulos = 0;
        carrito.forEach(item => {
          totalArticulos += item.cantidad;
        });
        // Actualizar el número total de artículos en el carrito
        document.querySelector('a[href="carrito.html"]').textContent = `🛒 Carrito (${totalArticulos})`;
      }
    }
  });

  app.mount('#detalleApp');
