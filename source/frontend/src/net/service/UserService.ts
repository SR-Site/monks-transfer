import { getValue } from 'util/injector';
import { GATEWAY } from 'data/Injectables';
import Endpoints from 'net/Endpoints';
import IContactData from 'data/interface/contact/IContactData';
import getStore from 'store';
import IContactKernelData from 'data/interface/contact/IContactKernelData';

export default class UserService {
	/**
	 * @public
	 * @description Submit the contact form
	 * @param data
	 * @returns {AxiosPromise}
	 */
	public static contact(data: IContactData) {
		return getValue(GATEWAY).post(
			Endpoints.getEndpoint(Endpoints.CONTACT),
			data,
			{
				headers: {
					'Content-Type': 'application/json',
					'X-CSRF-Token': getStore().getters['initData/csrfToken'],
				},
			},
		);
	}

	/**
	 * @public
	 * @description Submit the contact form
	 * @param data
	 * @returns {AxiosPromise}
	 */
	public static contactKernel(data: IContactKernelData) {
		return getValue(GATEWAY).post(
			Endpoints.getEndpoint(Endpoints.CONTACT_KERNEL),
			data,
			{
				headers: {
					'Content-Type': 'application/json',
					'X-CSRF-Token': getStore().getters['initData/csrfToken'],
				},
			},
		);
	}
}
