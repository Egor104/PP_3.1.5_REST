const url = 'http://localhost:8080/'

//функция заполнения главной таблицы юзеров
export function fillUsersTable() {
    const allUsersTableBody = document.getElementById('allUsersTableBody')

    $('#allUsersTableBody').empty()
    fetch(url + 'admin')
        .then(response => response.json())
        .then(data => {
            let columnContent = ''
            data.forEach(element => {
                columnContent += `<tr>
                    <td>${element.id}</td>
                    <td>${element.firstname}</td>
                    <td>${element.lastname}</td>
                    <td>${element.age}</td>
                    <td>${element.username}</td>
                    <td>${element.roles.map(role => role.name.substring(5))}</td>
                    <td>
                     <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-index="${element.id}"
                        data-bs-target="#modalDelete" id="buttonDelete">Delete</button>
                    </td>
                    <td>
                      <button type="button" id="buttonEdit" class="btn btn-info" data-bs-toggle="modal"
                       data-index="${element.id}"  data-bs-target="#modalEdit">Edit</button>
                    </td>
                    <td>
                    </td>
                </tr>
                `
            })
            allUsersTableBody.innerHTML = columnContent;

        })
}

export function fillInfo() {
    const allUsersTableBody = document.querySelector('header div h1')
    fetch(url + 'admin/user')
        .then(response => response.json())
        .then(data => {
                allUsersTableBody.innerHTML = data.username + ' User roles: ' + data.roles.map(roles => roles.name.substring(5))
            }
        )

}

//функция заполнения таблица текущего юзера
export function fullCurrentUserTable() {
    const currentUserTableBody = document.getElementById('currentUserTableBody')

    fetch(url + 'user')
        .then(response => response.json())
        .then(data => {
            let columnContent = '';
            columnContent += `<tr>
                    <td>${data.id}</td>
                <td id=${'name' + data.id}>${data.firstname}</td>
                <td id=${'lastname' + data.id}>${data.lastname}</td>
                <td id=${'age' + data.id}>${data.age}</td>
                <td id=${'username' + data.id}>${data.username}</td>
                <td id=${'role' + data.id}>${data.roles.map(role => role.name.substring(5)).join(' ')}</td>
                    </tr>`
            currentUserTableBody.innerHTML = columnContent;
            document.querySelector('header div h1').innerHTML = data.username + ' User roles: ' + data.roles.map(role => role.name.substring(5))
            document.getElementById("currentUserLoginInUser").innerHTML = data.username;
        })
}


//функция выбора ролей для нового юзера
export function getRolesForNewUser() {
    const selectRolesForNewUser = document.getElementById('selectRolesForNewUser')
    fetch('http://localhost:8080/admin/roles')
        .then(response => response.json())
        .then(data => {
                let resRoles = ''
                data.forEach(element => {
                    if (element.id === 2) {
                        resRoles +=
                            `
                    <option value='${element.id}' selected>
                    ${element.name.substring(5)}
                    </option>
                    `
                    } else {
                        resRoles +=
                            `
                    <option value='${element.id}' >
                    ${element.name.substring(5)}
                    </option>
                    `
                    }
                })
                selectRolesForNewUser.innerHTML = resRoles
            }
        )
}

//функция создания нового юзера
export function createNewUser(e) {
    e.preventDefault()
    const newUserForm = document.forms['formNewUser']
    let newUserRoles = []
    for (let option of document.getElementById('selectRolesForNewUser').options) {
        if (option.selected) {
            newUserRoles.push({
                id: option.value, name:  option.innerText
            })
        }
    }
    fetch("http://localhost:8080/admin/new_user", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            firstname: newUserForm.firstname.value,
            lastname: newUserForm.lastname.value,
            age: newUserForm.age.value,
            email: newUserForm.username.value,
            password: newUserForm.password.value,
            roles: newUserRoles
        })
    }).then((response) => {
        if (response.ok) {
            newUserForm.reset()
            fillUsersTable()
            $('.nav-tabs a[href="#UserTable"]').tab('show')
        }
    })
}

//функция заполнения форм (редактирования, удаления)
export function fillUserForm(id, formName, method) {
    fetch(url + 'admin/user/' + id)
        .then(response => response.json())
        .then(data => {
            formName.id.value = data.id
            formName.lastname.value = data.lastname
            formName.firstname.value = data.firstname
            formName.username.value = data.email
            formName.age.value = data.age
            formName.password.value = data.password.substring(10)
            let rolesForEditedUser = document.getElementById('roles' + method)
            let userRolesId = []
            data.roles.forEach(role => {
                userRolesId.push(role.id)
            })
            fetch('http://localhost:8080/admin/roles')
                .then(response => response.json())
                .then(data => {
                    let resRoles = ''
                    data.forEach(element => {
                        if (userRolesId.includes(element.id)) {
                            resRoles += `
                    <option value='${element.id}' selected>
                    ${element.name.substring(5)}
                    </option>
                    `
                        } else {
                            resRoles += `
                    <option value='${element.id}' >
                    ${element.name.substring(5)}
                    </option>
                    `
                        }
                    })
                    rolesForEditedUser.innerHTML = resRoles
                })
        })
}

//функция редактирования юзера
export function updateCurrentUser(e) {
    e.preventDefault()
    let editUserRoles = []
    for (let option of document.getElementById('rolesEdit').options) {
        if (option.selected) {
            editUserRoles.push({
                id: option.value, name: option.innerText
            })
        }
    }
    let userEditForm = document.forms['modalEditForm']
    fetch(url + 'admin/edit', {
        method: 'PUT', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            id: userEditForm.id.value,
            firstname: userEditForm.firstname.value,
            lastname: userEditForm.lastname.value,
            age: userEditForm.age.value,
            email: userEditForm.username.value,
            password: userEditForm.password.value,
            roles: editUserRoles
        })
    }).then((response) => {
        if (response.ok) {
            fillUsersTable()
            userEditForm.password.value = ''
            document.getElementById('closeEditModalWindow').click()
            $('.nav-tabs a[href="#UserTable"]').tab('show')
        }
    })
}

export function closeWindow() {
    document.getElementById('closeDeleteModal').click()
}

//функция удаления юзера
export function deleteCurrentUser(id) {
    fetch('http://localhost:8080/admin/delete/' + id,{
        method: 'DELETE'
    }).then(() => {
        fillUsersTable()
        // document.getElementById('closeDeleteModal').click()
        $('.nav-tabs a[href="#UserTable"]').tab('show')
    })
}
