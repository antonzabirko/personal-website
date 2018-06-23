import { login, logout } from "../../actions/auth";

test('should run logout action object', () => {
    const action = logout();

    expect(action).toEqual({
        type: 'LOGOUT'
    });
});

test('should run login action object', () => {
    const uid = '498zsbnzierA'
    const action = login(uid);

    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});