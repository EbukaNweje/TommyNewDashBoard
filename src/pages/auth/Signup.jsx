import { FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  userId } from "../../global/features";
import { FacebookFilled } from "@ant-design/icons";


const Signup = () => {
  const [loading, setLoading] = useState(false)

    const Nav = useNavigate()
  const dispatch = useDispatch()
  const User = z
    .object({
      firstName: z.string().min(1, { message: "First Name is required" }),
      lastName: z.string().min(1, { message: "Last Name is required" }),
      userName: z.string().min(1, { message: "User Name is required" }),
      email: z.string().email({ message: "Must be a valid email" }),
      phoneNumber: z
        .string()
        .min(10, { message: "Phone number must be at least 10 digits" })
        .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
      country: z.string().min(1, { message: "Country is required" }),
      password: z
        .string()
        .min(1, { message: "Password is required" })
        .regex(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/, {
          message:
            "Password must be 8 characters long, include an uppercase and special character (!@#$%^&*).",
        }),
      confirmPassword: z
        .string()
        .min(1, { message: "Confirm Password is required" }),
      check: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"], 
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(User),
  });

  const handleFacebook = (e) => {
    // window.location.href = "https://www.facebook.com/profile.php?id=61574843025485"
    console.log("first")
  }



  const Onsubmit = async (data, e) => {
    e.preventDefault(); 
    setLoading(true)
    const SendAdmin = async () => {
      const url = "https://mybrokerbackend.onrender.com/api/registrationSuccessfulEmail"
      const FormData = {
        email: data.email
      }

      await axios.post(url, FormData)
      .then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })

    }
    const url = 'https://unixswap-coin-api.vercel.app/api/register'
    const FormData ={
      password: data.password,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      userName:  data.userName,
      phoneNumber: data.phoneNumber,
      country: data.country,
    }
     await axios.post(url, FormData)
    .then(response=>{
      setLoading(false)
       console.log("response:",response.data.data._id);
       dispatch(userId(response?.data?.data?._id))
       toast.success(response?.data?.message)
       SendAdmin()
      //  if (response.data.verify === true) {
        Nav("/")
      //  } else {
      //   Nav("/await")
      //  }
    })
    .catch(error =>{
      setLoading(false)
      toast.error(error?.response?.data?.message)
      console.log("error:",error)
    })
  };
  const currentYear = new Date().getFullYear();
  return (
    <div className="w-full h-screen">
      <div className="w-full h-12 bg-[#f8f8f8] phone:hidden px-48 flex items-center justify-between">
        <div className="w-max flex items-center gap-4">
        <FacebookFilled onClick={handleFacebook}/>
        </div>
        <div className="w-max flex items-center gap-5 text-sm">
          <div className="w-max h-max cursor-pointer">Help</div>
          <div className="w-max h-max cursor-pointer">Support</div>
          <div className="w-max h-max cursor-pointer">Signup</div>
          <div className="w-max h-max cursor-pointer">Register</div>
        </div>
      </div>
      <div className="w-full h-max mt-28 mb-10 bg-[#ffffff] flex items-center justify-center flex-col gap-5">
        <p className="text-xl text-[#5d3891] font-semibold">Register an account</p>
        <form
          className="w-max phone:w-full phone:px-4 h-max flex flex-col items-center gap-5"
          onSubmit={handleSubmit(Onsubmit)}
        >
          <input
            type="text"
            className="w-[33rem] phone:w-full h-12 rounded border border-gray-100 bg-[#f8f8f8] outline-none pl-4"
            placeholder="First Name *"
            {...register("firstName")}
          />
          {errors?.firstName && <span style={{ color: "red" }}>{errors.firstName.message}</span>}

          <input
            type="text"
            className="w-[33rem] phone:w-full h-12 rounded border border-gray-100 bg-[#f8f8f8] outline-none pl-4"
            placeholder="Last Name *"
            {...register("lastName")}
          />
          {errors?.lastName && <span style={{ color: "red" }}>{errors.lastName.message}</span>}

          <input
            type="text"
            className="w-[33rem] phone:w-full h-12 rounded border border-gray-100 bg-[#f8f8f8] outline-none pl-4"
            placeholder="Username *"
            {...register("userName")}
          />
          {errors?.userName && <span style={{ color: "red" }}>{errors.userName.message}</span>}

          <input
            type="email"
            className="w-[33rem] phone:w-full h-12 rounded border border-gray-100 bg-[#f8f8f8] outline-none pl-4"
            placeholder="Email *"
            {...register("email")}
          />
          {errors?.email && <span style={{ color: "red" }}>{errors.email.message}</span>}

          <input
            type="text"
            className="w-[33rem] phone:w-full h-12 rounded border border-gray-100 bg-[#f8f8f8] outline-none pl-4"
            placeholder="Phone *"
            {...register("phoneNumber")}
          />
          {errors?.phoneNumber && <span style={{ color: "red" }}>{errors.phoneNumber.message}</span>}

          <select
            className="w-[33rem] phone:w-full h-12 rounded border border-gray-100 bg-[#f8f8f8] outline-none pl-4"
            {...register("country")}
          >
            <option value="">Select country</option>
            <option value='Afghanistan'>Afghanistan</option>
                                         <option value='Albania'>Albania</option>
                                         <option value='Algeria'>Algeria</option>
                                         <option value='American Samoa'>American Samoa</option>
                                          <option value='Andorra'>Andorra</option>
                                         <option value='Angola'>Angola</option>
                                         <option value='Anguilla'>Anguilla</option>
                                         <option value='Antarctica'>Antarctica</option>
                                         <option value='Antigua And Barbuda'>Antigua And Barbuda</option>
                                         <option value='Argentina'>Argentina</option><option value='Armenia'>Armenia</option>
                                         <option value='Aruba'>Aruba</option><option value='Australia'>Australia</option>
                                         <option value='Austria'>Austria</option><option value='Azerbaijan'>Azerbaijan</option>
                                         <option value='Bahamas The'>Bahamas The</option><option value='Bahrain'>Bahrain</option>
                                         <option value='Bangladesh'>Bangladesh</option><option value='Barbados'>Barbados</option>
                                         <option value='Belarus'>Belarus</option><option value='Belgium'>Belgium</option>
                                         <option value='Belize'>Belize</option><option value='Benin'>Benin</option>
                                         <option value='Bermuda'>Bermuda</option><option value='Bhutan'>Bhutan</option>
                                         <option value='Bolivia'>Bolivia</option><option value='Bosnia and Herzegovina'>Bosnia and Herzegovina</option>
                                         <option value='Botswana'>Botswana</option><option value='Bouvet Island'>Bouvet Island</option>
                                         <option value='Brazil'>Brazil</option><option value='British Indian Ocean Territory'>British Indian Ocean Territory</option>
                                         <option value='Brunei'>Brunei</option><option value='Bulgaria'>Bulgaria</option><option value='Burkina Faso'>Burkina Faso</option>
                                         <option value='Burundi'>Burundi</option><option value='Cambodia'>Cambodia</option><option value='Cameroon'>Cameroon</option>
                                         <option value='Canada'>Canada</option><option value='Cape Verde'>Cape Verde</option><option value='Cayman Islands'>Cayman Islands</option>
                                         <option value='Central African Republic'>Central African Republic</option><option value='Chad'>Chad</option>
                                         <option value='Chile'>Chile</option><option value='China'>China</option><option value='Christmas Island'>Christmas Island</option>
                                         <option value='Cocos (Keeling) Islands'>Cocos (Keeling) Islands</option><option value='Colombia'>Colombia</option>
                                         <option value='Comoros'>Comoros</option><option value='Congo'>Congo</option><option value='Congo The Democratic Republic Of The'>Congo The Democratic Republic Of The</option>
                                         <option value='Cook Islands'>Cook Islands</option><option value='Costa Rica'>Costa Rica</option>
                                         <option value='Cote D Ivoire (Ivory Coast)'>Cote D Ivoire (Ivory Coast)</option>
                                         <option value='Croatia (Hrvatska)'>Croatia (Hrvatska)</option><option value='Cuba'>Cuba</option>
                                         <option value='Cyprus'>Cyprus</option><option value='Czech Republic'>Czech Republic</option>
                                         <option value='Denmark'>Denmark</option><option value='Djibouti'>Djibouti</option><option value='Dominica'>Dominica</option>
                                         <option value='Dominican Republic'>Dominican Republic</option><option value='East Timor'>East Timor</option>
                                         <option value='Ecuador'>Ecuador</option><option value='Egypt'>Egypt</option><option value='El Salvador'>El Salvador</option>
                                         <option value='Equatorial Guinea'>Equatorial Guinea</option><option value='Eritrea'>Eritrea</option><option value='Estonia'>Estonia</option>
                                         <option value='Ethiopia'>Ethiopia</option><option value='External Territories of Australia'>External Territories of Australia</option>
                                         <option value='Falkland Islands'>Falkland Islands</option><option value='Faroe Islands'>Faroe Islands</option><option value='Fiji Islands'>Fiji Islands</option><option value='Finland'>Finland</option><option value='France'>France</option><option value='French Guiana'>French Guiana</option><option value='French Polynesia'>French Polynesia</option><option value='French Southern Territories'>French Southern Territories</option><option value='Gabon'>Gabon</option><option value='Gambia The'>Gambia The</option><option value='Georgia'>Georgia</option><option value='Germany'>Germany</option><option value='Ghana'>Ghana</option><option value='Gibraltar'>Gibraltar</option><option value='Greece'>Greece</option><option value='Greenland'>Greenland</option><option value='Grenada'>Grenada</option><option value='Guadeloupe'>Guadeloupe</option><option value='Guam'>Guam</option><option value='Guatemala'>Guatemala</option><option value='Guernsey and Alderney'>Guernsey and Alderney</option><option value='Guinea'>Guinea</option><option value='Guinea-Bissau'>Guinea-Bissau</option><option value='Guyana'>Guyana</option><option value='Haiti'>Haiti</option><option value='Heard and McDonald Islands'>Heard and McDonald Islands</option><option value='Honduras'>Honduras</option><option value='Hong Kong S.A.R.'>Hong Kong S.A.R.</option><option value='Hungary'>Hungary</option><option value='Iceland'>Iceland</option><option value='India'>India</option><option value='Indonesia'>Indonesia</option><option value='Iran'>Iran</option><option value='Iraq'>Iraq</option><option value='Ireland'>Ireland</option><option value='Israel'>Israel</option><option value='Italy'>Italy</option><option value='Jamaica'>Jamaica</option><option value='Japan'>Japan</option><option value='Jersey'>Jersey</option><option value='Jordan'>Jordan</option><option value='Kazakhstan'>Kazakhstan</option><option value='Kenya'>Kenya</option><option value='Kiribati'>Kiribati</option><option value='Korea North'>Korea North</option><option value='Korea South'>Korea South</option><option value='Kuwait'>Kuwait</option><option value='Kyrgyzstan'>Kyrgyzstan</option><option value='Laos'>Laos</option><option value='Latvia'>Latvia</option><option value='Lebanon'>Lebanon</option><option value='Lesotho'>Lesotho</option><option value='Liberia'>Liberia</option><option value='Libya'>Libya</option><option value='Liechtenstein'>Liechtenstein</option><option value='Lithuania'>Lithuania</option><option value='Luxembourg'>Luxembourg</option><option value='Macau S.A.R.'>Macau S.A.R.</option><option value='Macedonia'>Macedonia</option><option value='Madagascar'>Madagascar</option><option value='Malawi'>Malawi</option><option value='Malaysia'>Malaysia</option><option value='Maldives'>Maldives</option><option value='Mali'>Mali</option><option value='Malta'>Malta</option><option value='Man (Isle of)'>Man (Isle of)</option><option value='Marshall Islands'>Marshall Islands</option><option value='Martinique'>Martinique</option><option value='Mauritania'>Mauritania</option><option value='Mauritius'>Mauritius</option><option value='Mayotte'>Mayotte</option><option value='Mexico'>Mexico</option><option value='Micronesia'>Micronesia</option><option value='Moldova'>Moldova</option><option value='Monaco'>Monaco</option><option value='Mongolia'>Mongolia</option><option value='Montserrat'>Montserrat</option><option value='Morocco'>Morocco</option><option value='Mozambique'>Mozambique</option><option value='Myanmar'>Myanmar</option><option value='Namibia'>Namibia</option><option value='Nauru'>Nauru</option><option value='Nepal'>Nepal</option><option value='Netherlands Antilles'>Netherlands Antilles</option><option value='Netherlands The'>Netherlands The</option><option value='New Caledonia'>New Caledonia</option><option value='New Zealand'>New Zealand</option><option value='Nicaragua'>Nicaragua</option><option value='Niger'>Niger</option><option value='Nigeria'>Nigeria</option><option value='Niue'>Niue</option><option value='Norfolk Island'>Norfolk Island</option><option value='Northern Mariana Islands'>Northern Mariana Islands</option><option value='Norway'>Norway</option><option value='Oman'>Oman</option><option value='Pakistan'>Pakistan</option><option value='Palau'>Palau</option><option value='Palestinian Territory Occupied'>Palestinian Territory Occupied</option><option value='Panama'>Panama</option><option value='Papua new Guinea'>Papua new Guinea</option><option value='Paraguay'>Paraguay</option><option value='Peru'>Peru</option><option value='Philippines'>Philippines</option><option value='Pitcairn Island'>Pitcairn Island</option><option value='Poland'>Poland</option><option value='Portugal'>Portugal</option><option value='Puerto Rico'>Puerto Rico</option><option value='Qatar'>Qatar</option><option value='Reunion'>Reunion</option><option value='Romania'>Romania</option><option value='Russia'>Russia</option><option value='Rwanda'>Rwanda</option><option value='Saint Helena'>Saint Helena</option><option value='Saint Kitts And Nevis'>Saint Kitts And Nevis</option><option value='Saint Lucia'>Saint Lucia</option><option value='Saint Pierre and Miquelon'>Saint Pierre and Miquelon</option><option value='Saint Vincent And The Grenadines'>Saint Vincent And The Grenadines</option><option value='Samoa'>Samoa</option><option value='San Marino'>San Marino</option><option value='Sao Tome and Principe'>Sao Tome and Principe</option><option value='Saudi Arabia'>Saudi Arabia</option><option value='Senegal'>Senegal</option><option value='Serbia'>Serbia</option><option value='Seychelles'>Seychelles</option><option value='Sierra Leone'>Sierra Leone</option><option value='Singapore'>Singapore</option><option value='Slovakia'>Slovakia</option><option value='Slovenia'>Slovenia</option><option value='Smaller Territories of the UK'>Smaller Territories of the UK</option><option value='Solomon Islands'>Solomon Islands</option><option value='Somalia'>Somalia</option><option value='South Africa'>South Africa</option><option value='South Georgia'>South Georgia</option><option value='South Sudan'>South Sudan</option><option value='Spain'>Spain</option><option value='Sri Lanka'>Sri Lanka</option><option value='Sudan'>Sudan</option><option value='Suriname'>Suriname</option><option value='Svalbard And Jan Mayen Islands'>Svalbard And Jan Mayen Islands</option><option value='Swaziland'>Swaziland</option><option value='Sweden'>Sweden</option><option value='Switzerland'>Switzerland</option><option value='Syria'>Syria</option><option value='Taiwan'>Taiwan</option><option value='Tajikistan'>Tajikistan</option><option value='Tanzania'>Tanzania</option><option value='Thailand'>Thailand</option><option value='Togo'>Togo</option><option value='Tokelau'>Tokelau</option><option value='Tonga'>Tonga</option><option value='Trinidad And Tobago'>Trinidad And Tobago</option><option value='Tunisia'>Tunisia</option><option value='Turkey'>Turkey</option><option value='Turkmenistan'>Turkmenistan</option><option value='Turks And Caicos Islands'>Turks And Caicos Islands</option><option value='Tuvalu'>Tuvalu</option><option value='Uganda'>Uganda</option><option value='Ukraine'>Ukraine</option><option value='United Arab Emirates'>United Arab Emirates</option><option value='United Kingdom'>United Kingdom</option><option value='United States'>United States</option><option value='United States Minor Outlying Islands'>United States Minor Outlying Islands</option><option value='Uruguay'>Uruguay</option><option value='Uzbekistan'>Uzbekistan</option><option value='Vanuatu'>Vanuatu</option><option value='Vatican City State (Holy See)'>Vatican City State (Holy See)</option><option value='Venezuela'>Venezuela</option><option value='Vietnam'>Vietnam</option><option value='Virgin Islands (British)'>Virgin Islands (British)</option><option value='Virgin Islands (US)'>Virgin Islands (US)</option><option value='Wallis And Futuna Islands'>Wallis And Futuna Islands</option><option value='Western Sahara'>Western Sahara</option><option value='Yemen'>Yemen</option><option value='Yugoslavia'>Yugoslavia</option>
                                         <option value='Zambia'>Zambia</option> 
                                         <option value='Zimbabwe'>Zimbabwe</option>
          </select>
          {errors?.country && <span style={{ color: "red" }}>{errors.country.message}</span>}

          <input
            type="password"
            className="w-[33rem] phone:w-full h-12 rounded border border-gray-100 bg-[#f8f8f8] outline-none pl-4"
            placeholder="Password *"
            {...register("password")}
          />
          {errors?.password && <span style={{ color: "red" }}>{errors.password.message}</span>}

          <input
            type="password"
            className="w-[33rem] phone:w-full h-12 rounded border border-gray-100 bg-[#f8f8f8] outline-none pl-4"
            placeholder="Confirm Password *"
            {...register("confirmPassword")}
          />
          {errors?.confirmPassword && <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>}

          <div className="w-[33rem] phone:w-full flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 cursor-pointer"
              {...register("check")}
            />
            <label className="ml-2 phone:w-full text-sm text-gray-500 flex gap-2">
              I accept and agree with the terms
              <a href="#" className="text-[#a286f4]">
                Terms and Conditions
              </a>
              and
              <a href="#" className="text-[#a286f4]">
                Privacy Policy
              </a>
            </label>
          </div>
          {errors?.check && <span style={{ color: "red" }}>{errors.check.message}</span>}

          <button
            type="submit"
            className="w-40 h-12 rounded bg-[#8865f0] text-white text-sm font-bold transition-all duration-500 hover:bg-white hover:border-2 hover:text-[#a286f4] hover:border-[#a286f4]"
          >
            { loading ? <ClipLoader color='white' /> :
                               "Register" 
                               } 
          </button>

          <div className="w-max phone:w-full phone:justify-between phone:gap-0 h-max flex gap-20 text-sm text-[#a286f4]">
            <div className="w-max h-max cursor-pointer">Already registered?</div>
            <NavLink to={"/"}>
              <div className="w-max h-max cursor-pointer">Login here</div>
            </NavLink>
          </div>
        </form>
      </div>
      <div className="w-full phone:h-24 phone:gap-3 phone:flex-col phone:justify-center phone:py-4 h-14 text-white px-48 flex items-center justify-between bg-[#0e1120]">
        <div className="w-max flex items-center gap-4">
        <p className="flex gap-5 items-center text-white">&copy;  Copy Rights {currentYear}. All Rights Reserved Unixswap-Coin</p>
        </div>
        <div className="w-max flex items-center gap-5 ">
          <FaTwitter />
          <FaTelegram />
          <FaInstagram />
        </div>
      </div>
      <Toaster position="top"/>
    </div>
  );
};

export default Signup;
