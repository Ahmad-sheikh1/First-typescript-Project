const main_container = document.querySelector(".main_container") as HTMLElement;
const SearchInput = document.querySelector("#Search_Input") as HTMLInputElement;
const FormSubmit = document.querySelector("#form") as HTMLFormElement;

// define the object interface
interface UserData {
    avatar_url: string;
    id: number;
    login: string;
    url: string;
}

async function FetchData<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Data cant be fetched${res.status}`);
    }
    const data = await res.json();
    return data;

}

const ShowResultUI = (singeuser: UserData) => {
    const { login, url, avatar_url, id } = singeuser;
    main_container.insertAdjacentHTML(
        "beforeend",
        `
        <div class="center">
        <div class="article-card">
          <div class="content">
            <p class="date">github</p>
            <p class="title">${login}</p>
          </div>
          <img src=${avatar_url} />
        </div>
      </div>
        `
    )
}

function mycoustomfetcher(url: string) {
    FetchData<UserData[]>(url)
        .then(data => {
            console.log(data);
            for (const singeuser of data) {
                ShowResultUI(singeuser);
                // console.log("lll ", singeuser.login);
            }
        })
        .catch(error => {
            console.error(error);
        });
}

mycoustomfetcher("https://api.github.com/users");

// Search Functionality

const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const searchValue = SearchInput.value.toLowerCase();

    try {
        const url = `https://api.github.com/users`;
        const allData = await FetchData<UserData[]>(url)
        const matchinguser = allData.filter((user) => {
            return user.login.toLocaleLowerCase().includes(searchValue);
        });
        main_container.innerHTML = "";
        if (matchinguser.length === 0) {
            return false;
        }
        else {
            for (const singleuser of matchinguser) {
                ShowResultUI(singleuser)
            }
        }
    } catch (error) {
        console.log("Search Issue", error);
    }
};

FormSubmit.addEventListener("submit", handleSubmit);