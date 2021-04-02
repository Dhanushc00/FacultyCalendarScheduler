import { getByAltText } from '@testing-library/react';
import PartcipantScreen from '../screens/Faculty/PartcipantScreen';
import { render , fireEvent,screen } from '../test-utils';

describe("Render particiant page", () => {
    it('renders title', () => {
      const {getAllByText} = render(<PartcipantScreen/>);
      expect(getAllByText(/Participant/i)).toBeTruthy();
    });

    it('renders column names',()=>{
        const {getByText} = render(<PartcipantScreen/>);
        expect(getByText(/Event Name/i)).toBeInTheDocument();
        expect(getByText(/Creator/i)).toBeInTheDocument();
        expect(getByText(/End Time/i)).toBeInTheDocument();
        expect(getByText(/Start Time/i)).toBeInTheDocument();
        expect(getByText(/View/i)).toBeInTheDocument();
    });
    
});