import CreateAccountNav from '../navigation/CreateAccountNav';
import { render  } from '../test-utils';

describe('Create account titles',()=>{
    it('titles',()=>{
        const { getAllByText } = render(<CreateAccountNav/>);
        expect(getAllByText("CREATE NEW ACCOUNT")).toBeTruthy();
        expect(getAllByText("VIEW ACCOUNTS")).toBeTruthy();
    })
})