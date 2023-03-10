import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from './style.module.scss';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { loginUser } from '../../../apicalls/users';
import { useDispatch } from 'react-redux'
import { ShowLoading, HideLoading } from '../../.././redux/loaderSlice/loaderSlice'
const Login = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('*Keçərsiz e-mail adress!').required('*E-mail xanasını doldurun!'),
      password: Yup.string()
        .required('*Parol daxil edin!')
        .min(6, '*Minumum 6 simvol olmalıdır!')
    }),
    onSubmit: async (values) => {
      try {
        dispatch(ShowLoading())
        const response = await loginUser(values)
        dispatch(HideLoading())
        if (response.success) {
          message.success(response.message)
          localStorage.setItem('token', response.data)
          window.location.href = "/quizz";
        } else {
          message.error(response.message);
        }
      } catch (error) {
        dispatch(HideLoading())
        message.error(error.message);
      }
      formik.resetForm()
    },
  });
  return (
    <div className={styled.login_body}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className={styled.header}>
        <img src="https://png.pngtree.com/png-vector/20191021/ourmid/pngtree-black-quill-feather-pen-with-writing-line-vector-logo-design-png-image_1840025.jpg" alt="" />
        <h1>Quizlet</h1>
      </div>
      <div className={styled.login}>
        <div className={styled.login_left}>
          <form onSubmit={formik.handleSubmit}>
            <h2>Login</h2>
            <div className={styled.inp_body}>
              <HiOutlineMail />
              <input
                id="email"
                name="email"
                type="email"
                placeholder='E-mail'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />

            </div>
            {formik.touched.email && formik.errors.email ? (
              <span className={styled.requried}>{formik.errors.email}</span>
            ) : null}
            <div className={styled.inp_body}>
              <RiLockPasswordLine />
              <input
                id="password"
                name="password"
                type="password"
                placeholder='Password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <span className={styled.requried}>{formik.errors.password}</span>
            ) : null}

            <button type="submit">Continue</button>
            <Link className={styled.register_link} to='/register'>
              Not a member? Register
            </Link>
          </form>
        </div>
        <div className={styled.login_right}>

        </div>
      </div>
    </div>
  )
}

export default Login