import authReducer from '../../reducers/auth';

test('should process the login action', () => {
    const uid = '34tuzbf8znh';
    const state = authReducer(undefined, {
        type: 'LOGIN',
        uid
    });

    expect(state).toEqual({ uid });
});

test('should process the logout action', () => {
    const state = authReducer(undefined, {
        type: 'LOGOUT'
    });

    expect(state).toEqual({ });
});