import SignInScreen from '../screens/SignInScreen';
import { render , fireEvent,screen } from '../test-utils';
import { act } from 'react-dom/test-utils';


describe("SignIN render Page", () => {
  it('renders the SignIN page', () => {
    const {getByText} = render(<SignInScreen/>);
    expect(getByText(/SIGN-IN/i)).toBeInTheDocument();
  });

  it('render 2 input fields', () => {
    const {getByTestId} = render(<SignInScreen/>);
    expect(getByTestId(/email/i)).toBeInTheDocument();
    expect(getByTestId(/password/i)).toBeInTheDocument();
  });

  it('renders select option', async () => {
        
    const { getByText } = render(<SignInScreen/>);

    const placeholder = getByText('Sign in as');

    expect(placeholder).toBeTruthy();
  });

  it('renders a submit button', () => {
    const {getByText} = render(<SignInScreen/>);
    expect(getByText("SUBMIT")).toBeInTheDocument();
  });
});

describe("Form behaviour",  () => {
//   it('validate user inputs', async () => {
//     const { getByTestId, getByText } = render(<SignInScreen/>)

//     await act (async () => {
//       fireEvent.change(screen.getByTestId(/email/i), {
//         target: {value: ''},
//       });

//       fireEvent.change(screen.getByTestId(/password/i), {
//         target: {value: ''},
//       });
//     });
//     console.log("Please enter Email and password")
//     await act (async () => {
//       fireEvent.submit(getByText('SUBMIT'))
//     });

//   });

  it('should submit when form inputs contain text', async () => {
    const { getByTestId, queryByText } = render(<SignInScreen/>)
    await act(async () => {
      fireEvent.change(screen.getByTestId(/email/i), {
        target: {value: 'admin@admin.com'},
      });

      fireEvent.change(screen.getByTestId(/password/i), {
        target: {value: 'admin12345'},
      });
      
    });

    await act (async () => {
      fireEvent.submit(queryByText('SUBMIT'))
    });

  });

});

// describe("Submit button",  () => {
//   test("should be able to submit signIn form",async()=>{
//     const mockFn=jest.fn()
//     const {getByRole}=render(<SignInScreen {mockFn}/>)
//     const buttonInput=getByRole("submit");
//     fireEvent.submit(buttonInput);
//     expect(mockFn).toHaveBeenCalledTimes(1);

//   });
// });



// it("submits correct values", async () => {
//   const { container } = render(<SignInScreen />)
//   const emailInput = container.querySelector('input[id="email"]')
//   const passwordInput = container.querySelector('input[id="password"]')
//   const roleInput=container.querySelector('select[id="role"]')
//   const submit = container.querySelector('button[type="submit"]')

//   await act(() => {
//     fireEvent.change(emailInput, {
//       target: {
//         value: "admin@admin.com"
//       }
//     })
//   })

//   await act(() => {
//     fireEvent.change(passwordInput, {
//       target: {
//         value: "admin12345"
//       }
//     })
//   })

  // await act(() => {
  //   fireEvent.change(roleInput, {
  //     target: {
  //       value: "Faculty"
  //     }
  //   })
  // })

//   await act(() => {
//     fireEvent.click(submit)
//   })
// })



















