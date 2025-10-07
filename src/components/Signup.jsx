// Signup.jsx
import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PulseLoader } from 'react-spinners'
import Error from './Error'
import * as Yup from 'yup'
import { useFetch } from '../hooks/use-fetch'
import { signup } from '../db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '../Context'
import { toast } from 'react-hot-toast';



const Signup = () => {
  const [errors, setErrors] = React.useState({})
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    profile_pic: null,
  });
  const [submitting, setSubmitting] = React.useState(false)


  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const longLink = searchParams.get('createNew')


  // ✅ Use the hook and its fn
  const { data, error, loading, fn: fnSignup } = useFetch(signup)


  const { fetchUser } = UrlState()


  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }))
  }





  // ✅ Redirect only after a REAL success (data?.user set by the hook)
  useEffect(() => {
    if (data?.user) {
      toast.success('Account Created Successfully! 🎉');
      const qs = longLink ? `?createNew=${encodeURIComponent(longLink)}` : ''
      fetchUser?.()
      navigate(`/dashboard${qs}`)
    }
  }, [data, longLink, navigate, fetchUser])


  // useEffect(()=>{
  //   console.log("Data",data,"Error", error,"Loading", loading);
  // },[data, error, loading])

 



  const handleSignup = async (e) => {
    e.preventDefault()
    setErrors({})
    setSubmitting(true);
    // ✅ Robust Yup schema; basic file presence check
    const schema = Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid Email').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      profile_pic: Yup.mixed()
        .required('Profile picture is required')
        .test('fileType', 'Please select an image', (file) => !!file && /^image\//.test(file.type)),
    })


    try {
      await schema.validate(formData, { abortEarly: false })
    } catch (err) {
      // ✅ Collect Yup errors safely
      if (err instanceof Yup.ValidationError) {
        const next = {}
        if (Array.isArray(err.inner) && err.inner.length) {
          err.inner.forEach((e) => { if (e.path) next[e.path] = e.message })
        } else if (err.path) {
          next[err.path] = err.message
        } else {
          next.form = 'Please fix the highlighted fields.'
        }
        setErrors(next)
        return // ⛔ Stop: don’t call API if validation failed
      }
      setErrors({ form: err?.message || 'Validation failed' })
      return
    }finally{
      setSubmitting(false);
    }

    try {

      // ✅ If your API expects multipart/form-data (common for file upload):
      const fd = new FormData()
      fd.append('name', formData.name)
      fd.append('email', formData.email)
      fd.append('password', formData.password)
      fd.append('profile_pic', formData.profile_pic)


      // IMPORTANT:
      // - If your `signup` API expects a plain object, replace `fd` with the object.
      // - If it expects FormData, keep `fd`.
      const res = await fnSignup({
         name: formData.name,
         email: formData.email,
         password: formData.password,
         profile_pic: formData.profile_pic, // a File
      })


      // ✅ Guard soft-failures: res can be null or { user: null }
      if (!res || !res.user) {
        setErrors((p) => ({ ...p, form: 'Signup failed' }))
        return
      }
      // success → redirect happens in the useEffect when data?.user is set
    } catch (err) {
      setErrors({ form: err?.message || 'Signup failed' })
    }




  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        {/* ✅ Show hook/API level errors and form-level errors */}
        {error && <Error message={error.message || 'Something went wrong'} />}
        {errors.form && <Error message={errors.form} />}

        <CardTitle>Signup</CardTitle>
        <CardDescription>create an new account if you haven't already</CardDescription>
      </CardHeader>

      {/* ✅ Use onSubmit only; noValidate lets Yup show errors */}
      <form onSubmit={handleSignup} noValidate>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name here"
                autoComplete="name"
                required
                value={formData.name}             
                onChange={handleInputChange}
              />
              {errors.name && <Error message={errors.name} />}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                required
                value={formData.email}           
                onChange={handleInputChange}
              />
              {errors.email && <Error message={errors.email} />}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}        
                onChange={handleInputChange}
              />
              {errors.password && <Error message={errors.password} />}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="profile_pic">Profile Picture</Label>
              <Input
                id="profile_pic"
                name="profile_pic"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
              />
              {errors.profile_pic && <Error message={errors.profile_pic} />}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full mt-4 bg-neutral-50 text-black hover:bg-green-600 hover:text-white"
            disabled={submitting || loading}              
          >
            {submitting ||loading ? <PulseLoader size={10} /> : 'Create Account'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default Signup
