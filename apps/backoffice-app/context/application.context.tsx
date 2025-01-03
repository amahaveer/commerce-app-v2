'use client'
import { getUserData } from "app/api/me.api";
import { getMyProjects } from "app/api/project.api";
import { getProjectSettings } from "app/api/projectSettings.api";
import { createContext, useContext, useEffect, useState } from "react";
import CookieService from "service/cookie";
import { IAppContextExpose } from "types/global";


export const ApplicationContext = createContext<IAppContextExpose>({
	openFilterDrawer: false,
	editFilter: false,
	currencies: [],
	countries: [],
	projectList: [],
	selectedProject: "",
	userData: null,
	setEditFilter: () => { },
	setOpenFilterDrawer: () => { },
	setSelectedProject: () => { }
});

export const ApplicationProvider = ({ children }: any) => {

	const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
	const [editFilter, setEditFilter] = useState(false);
	const [countries, setCountries] = useState([]);
	const [currencies, setCurrencies] = useState([]);
	const [projectList, setProjectList] = useState<Array<any>>([]);
	const [selectedProject, setSelectedProject] = useState("");
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		fetchProjectSettings()
		intiProjectList();
		getUserProfileData();
	}, [])

	const getUserProfileData = async () => {
		const data = await getUserData();
		if (!data) {
			CookieService.clearCookies();

		}
		setUserData(data);
	}

	const intiProjectList = async () => {
		const data: Array<any> = await getMyProjects()
		if (!data) return;
		setSelectedProject(data[0]?.name)
		setProjectList(data);
	}

	const fetchProjectSettings = async () => {
		const data = await getProjectSettings();
		if (data) {
			setCountries(data.countries);
			setCurrencies(data.currencies);
		}
	}

	const expose: IAppContextExpose = {
		openFilterDrawer,
		editFilter,
		countries,
		currencies,
		projectList,
		selectedProject,
		userData,
		setSelectedProject,
		setEditFilter,
		setOpenFilterDrawer,
	}

	return (
		<ApplicationContext.Provider value={expose}>
			{children}
		</ApplicationContext.Provider>
	);
}

export const useAppContext = () => {
	const context = useContext(ApplicationContext);

	if (context === undefined) {
		throw new Error("Component Must be used within a App Provider");
	}

	return context;
}