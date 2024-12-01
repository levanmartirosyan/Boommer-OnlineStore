import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token =
    typeof window !== 'undefined' ? sessionStorage.getItem('userToken') : null;
  const auth = token
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    : req;
  return next(auth);
};
