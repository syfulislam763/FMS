


export const ROOT_URL = "http://10.10.10.63/api/v1"


//Auth API
//POST
export const CREATE_USER = "/users"
export const VERIFY_EMAIL = "/auth/verify-email"
export const RESEND_OTP = "/auth/resend-otp"
export const LOGIN = "/auth/login"
export const FORGET_PASS = "/auth/forget-password"
export const RESET_PASS = "/auth/reset-password"
export const CHANGE_PASS = "/auth/change-password"

//GET
export const USER_PROFILE = "/users/profile"


//BUDGET

//POST
export const BUDGET = "/budgets/"

//DELETE

//UPDATE

//GET

//APPOINTMENT
export const APPOINTMENT = "/appointments/"

//INCOME
export const INCOME = "/incomes/"

//DEBTS
export const DEBTS = "/debts/"


//EXPENSE
export const EXPENSE = "/expenses/"

//CALCULATOR
//post
export const SAVING_CALCULATOR = "/calculator/saving-calculator"
export const LOAN_CALCULATOR = "/calculator/loan-repayment-calculator"
export const INFLATION_CALCULATOR = "/calculator/inflation-calculator"
export const HISTORY_CALCULATOR = "/calculator/historical-inflation-calculator"

//SAVING GOAL
export const SAVING_GOAL = "/saving-goals/"


//PACKAGE
export const PACKAGE = "/packages/"


//SUBSCRIPTION



//HOME
export const GET_ANALYTICS = "/analytics/"
export const GET_LAST_ANALYTICS = "/analytics/user-last-update"