// Login.jsx
import React, { useEffect } from 'react'
import {
  Card,
  // CardAction, // CHANGE: removed unused import
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PulseLoader } from 'react-spinners' // CHANGE: removed BeatLoader (unused)
import Error from './Error'
import * as Yup from 'yup'
import { useFetch } from '../hooks/use-fetch'
import { login } from '../db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '../Context'

const Login = () => {
  const [errors, setErrors] = React.useState({}) // CHANGE: object (not array)
  const [formData, setFormData] = React.useState({ email: '', password: '' })

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const longLink = searchParams.get('createNew')

  // CHANGE: do NOT pass formData to the hook; call-time args are safer
  const { data, error, loading, fn: fnLogin } = useFetch(login)

  const {fetchUser} = UrlState();

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // CHANGE: redirect ONLY on real success (presence of data?.user)
  useEffect(() => {
    if (data?.user) {
      const qs = longLink ? `?createNew=${encodeURIComponent(longLink)}` : ''
      navigate(`/dashboard${qs}`)
      fetchUser();
    }
  }, [data, longLink, navigate])

  const handleLogin = async (e) => {
     e.preventDefault() // CHANGE: stop native submit
    setErrors({})

    // CHANGE: robust Yup schema + validate first; bail early on failure
    const schema = Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    })

    try {
      await schema.validate(formData, { abortEarly: false })
    } catch (err) {
      // CHANGE: handle both aggregated and single-field validation errors
      if (err instanceof Yup.ValidationError) {
        const newErrors = {}
        if (Array.isArray(err.inner) && err.inner.length) {
          err.inner.forEach((e) => {
            if (e.path) newErrors[e.path] = e.message
          })
        } else if (err.path) {
          newErrors[err.path] = err.message
        } else {
          newErrors.form = 'Please fix the highlighted fields.'
        }
        setErrors(newErrors)
        return // IMPORTANT: do NOT call API if validation failed
      }
      setErrors({ form: err?.message || 'Validation failed' })
      return
    }

    // CHANGE: pass credentials to the fetch function; guard soft-failures
    try {
      const res = await fnLogin({ email: formData.email, password: formData.password })
      if (!res || !res.user) {
     setErrors((p) => ({ ...p, form: 'Invalid email or password' }));
     return;
     }
      // success path: redirect is handled by the useEffect that checks data?.user
    } catch (err) {
      // CHANGE: show API/network errors in UI
      setErrors({ form: err?.message || 'Invalid email or password' })
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        {/* CHANGE: show API/hook error and form-level error */}
        {error && <Error message={error.message || 'Something went wrong'} />}
        {errors.form && <Error message={errors.form} />}

        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      {/* CHANGE: keep button inside form; onSubmit -> handleLogin */}
      <form onSubmit={handleLogin} noValidate>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"                // CHANGE: ensure `name` is present
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                required
                value={formData.email}      // CHANGE: controlled input
                onChange={handleInputChange}
              />
              {errors.email && <Error message={errors.email} />}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                name="password"             // CHANGE: ensure `name` is present
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}   // CHANGE: controlled input
                onChange={handleInputChange}
              />
              {errors.password && <Error message={errors.password} />}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full mt-4 bg-neutral-50 text-black hover:bg-green-600 hover:text-white"
            disabled={loading}             // CHANGE: disable while loading
          >
            {loading ? <PulseLoader size={10} /> : 'Login'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default Login
