import ViewAccountsScreen from '../screens/Admin/ViewAccountsScreen';
import { render  } from '../test-utils';

describe('rendering acccounts list',()=>{
    it('render Table caption',()=>{
        const {getByText} = render(<ViewAccountsScreen/>);
        expect(getByText("Faculty and Admin Accounts")).toBeInTheDocument();
    });
    it('renders column names',()=>{
        const {getByText} = render(<ViewAccountsScreen/>);
        expect(getByText(/UserName/i)).toBeInTheDocument();
        expect(getByText(/Email/i)).toBeInTheDocument();
        expect(getByText(/Roles/i)).toBeInTheDocument();
        expect(getByText(/CreatedAt/i)).toBeInTheDocument();
        expect(getByText(/UpdatedAt/i)).toBeInTheDocument();
    });

});