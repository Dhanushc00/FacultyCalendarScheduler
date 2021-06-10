import CreateEventsScreen from '../screens/Faculty/CreateEventsScreen';
import { render  } from '../test-utils';

describe("Render Create event page", () => {
    
    it('event name', async () => {  
        const { getByTestId } = render(<CreateEventsScreen/>);
        const id = getByTestId('EventName');
        expect(id).toBeTruthy();
    });
    it('Location', async () => {  
        const { getByTestId } = render(<CreateEventsScreen/>);
        const id = getByTestId('Location');
        expect(id).toBeTruthy();
    });
    it('description of event', async () => {  
        const { getByTestId } = render(<CreateEventsScreen/>);
        const id = getByTestId('Description'); 
        expect(id).toBeTruthy();
    });

    it('type of event', async () => {  
        const { getByText } = render(<CreateEventsScreen/>);
        const placeholder = getByText('Event Type');
        expect(placeholder).toBeTruthy();
    });

    it('renders submit button', () => {
        const {getByText} = render(<CreateEventsScreen/>);
        expect(getByText("SUBMIT")).toBeInTheDocument();
    });
});