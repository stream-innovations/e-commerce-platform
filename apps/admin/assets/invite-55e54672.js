import{a8 as S,r as C,d1 as q,u as k,j as a,a as e,B as m}from"./index-e7a18dfd.js";import{q as E}from"./index-8922145e.js";import{c as L,g as P,I as l,u as F}from"./index-7128677f.js";import{d as I}from"./index.modern-4267b5d6.js";import{P as d,S as n}from"./login-layout-fbd4223d.js";import{S as u}from"./index-5243ee91.js";import{F as c}from"./index-71121ddc.js";const U=()=>{const p=S(),t=E.parse(p.search.substring(1)),[h,g]=C.useState(!1);let o=null;if(t!=null&&t.token)try{o=I(t.token)}catch{o=null}const{register:s,handleSubmit:f,formState:{errors:i},setError:x}=L({defaultValues:{first_name:"",last_name:"",password:"",repeat_password:""}}),{mutate:w,isLoading:v}=q(),y=k(),_=F(),N=f(r=>{if(r.password!==r.repeat_password){x("repeat_password",{type:"manual",message:"Passwords do not match"},{shouldFocus:!0});return}w({token:t.token,user:{first_name:r.first_name,last_name:r.last_name,password:r.password}},{onSuccess:()=>{y("/login")},onError:b=>{_("Error",P(b),"error")}})});return o?a(d,{children:[e(u,{title:"Create Account"}),h?e("form",{onSubmit:N,children:a("div",{className:"flex flex-col items-center",children:[e("h1",{className:"inter-xlarge-semibold mb-large text-[20px]",children:"Create your Medusa account"}),a("div",{className:"gap-y-small flex flex-col",children:[a("div",{children:[e(n,{placeholder:"First name",...s("first_name",{required:c.required("First name")}),autoComplete:"given-name"}),e(l,{errors:i,name:"first_name"})]}),a("div",{children:[e(n,{placeholder:"Last name",...s("last_name",{required:c.required("Last name")}),autoComplete:"family-name"}),e(l,{errors:i,name:"last_name"})]}),e("div",{children:e(n,{placeholder:"Password",type:"password",...s("password",{required:c.required("Password")}),autoComplete:"new-password"})}),a("div",{children:[e(n,{placeholder:"Confirm password",type:"password",...s("repeat_password",{required:"You must confirm your password"}),autoComplete:"new-password"}),e(l,{errors:i,name:"repeat_password"})]})]}),e(m,{variant:"secondary",size:"medium",className:"mt-large w-[280px]",loading:v,children:"Create account"}),a("p",{className:"inter-small-regular text-grey-50 mt-xlarge",children:["Already signed up? ",e("a",{href:"/login",children:"Log in"})]})]})}):a("div",{className:"flex flex-col items-center text-center",children:[e("h1",{className:"inter-xlarge-semibold text-[20px]",children:"You have been invited to join the team"}),a("p",{className:"inter-base-regular text-grey-50 mt-xsmall",children:["You can now join the team. Sign up below and get started",e("br",{}),"with your Medusa account right away."]}),e(m,{variant:"secondary",size:"medium",className:"mt-xlarge w-[280px]",onClick:()=>g(!0),children:"Sign up"})]})]}):a(d,{children:[e(u,{title:"Create Account"}),a("div",{className:"gap-y-xsmall flex flex-col items-center",children:[e("h1",{className:"inter-xlarge-semibold mb- text-[20px]",children:"Invalid invite"}),e("p",{className:"inter-base-regular text-grey-50 w-[280px] text-center",children:"The invite link you have used is invalid. Please contact your administrator."}),a("p",{className:"inter-small-regular text-grey-40 mt-xlarge",children:["Already have an account? ",e("a",{href:"/login",children:"Log in"})]})]})]})};export{U as default};
