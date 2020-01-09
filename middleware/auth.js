
export default async function ({
  // eslint-disable-next-line no-unused-vars
  route, redirect, store, $swal,
}) {
  if (route.path.includes('login') || route.path.includes('signup')) {
    return;
  }
  if (store.state.user.isAdmin == null && (route.path.includes('account')
  || route.path.includes('admin') || route.path.includes('checkout'))) {
    // 未登入下打開登入視窗
    redirect('/');
    store.commit('OPENLOGINBOX', true);
    return;
  }
  if (route.path.includes('admin') && !store.state.user.isAdmin) {
    $swal.fire({
      title: '未擁有管理員權限',
      icon: 'error',
    });
    redirect('/');
    return;
  }
  if (route.path.includes('account') && !store.state.user.emailVerified) {
    // email 未驗證導入驗證畫面
    $swal.fire({
      title: '請先驗證信箱',
      icon: 'error',
    });
    redirect('/account');
    // return;
  }
}
