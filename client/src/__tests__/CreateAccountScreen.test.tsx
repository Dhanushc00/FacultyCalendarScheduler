import CreateAccountScreen from '../screens/Admin/CreateAccountScreen';
import { render  } from '../test-utils';

describe('Create account module render',()=>{
    it('title render',()=>{
        const {getByText} = render(<CreateAccountScreen/>);
        expect(getByText("CREATE NEW ACCOUNT")).toBeInTheDocument();
    });
    it('render 2 input fields', () => {
        const {getByTestId} = render(<CreateAccountScreen/>);
        expect(getByTestId(/email/i)).toBeInTheDocument();
        expect(getByTestId(/username/i)).toBeInTheDocument();
    });

    it('render role type',()=>{
        const {getByText} = render(<CreateAccountScreen/>);
        expect(getByText("Select role:")).toBeInTheDocument();
    });

    it('renders a  button', () => {
        const {getByText} = render(<CreateAccountScreen/>);
        expect(getByText("Create and send e-mail to the user")).toBeInTheDocument();
      });
})