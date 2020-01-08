import swal from 'sweetalert2/dist/sweetalert2.min';
import 'sweetalert2/dist/sweetalert2.min.css';

const swalmix = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

export default function (ctx, inject) {
  ctx.$swal = swalmix;
  inject('swal', swalmix);
}
