
import RadioButtonsGroup from '@/components/atoms/RadioGroup';
import CustomFieldMapper from '@/components/organisms/customFieldMapper';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { getAddressTitlePanelOptions } from 'utils/order';
import EditIcon from '@mui/icons-material/Edit';
import { getAddressFormSchema } from './schema';
import useTranslate from 'hooks/useTranslate';
import { useState } from 'react';
import CustomButton from '@/components/atoms/Button';
import { IAddressFormLayoutProps } from '../types';

const AddressFormLayout = (props: IAddressFormLayoutProps) => {

	const { address, editAddressId, onSaveAddress, setEditAddressId } = props;
	const { translate } = useTranslate();
	const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

	const addressFields = getAddressFormSchema(translate, { disabled: !editAddressId })

	return (
		address.length > 0 && address.map((item: any, index: number) => (
			<Box key={index} component="form">
				<Box className="flex items-center justify-between border border-gray-300 p-5">
					<RadioButtonsGroup
						options={getAddressTitlePanelOptions(item)}
						labelClass="font-semibold text-[1rem] text-commerceBlack w-auto"
						value={selectedAddressIndex === index && item.id}
						onSelect={() => setSelectedAddressIndex(index)}
					/>
					{editAddressId !== item.id &&
						<IconButton onClick={() => setEditAddressId(item.id)} disabled={!!editAddressId || selectedAddressIndex !== index}>
							<EditIcon />
						</IconButton>
					}
					{editAddressId === item.id &&
						<Box className="flex gap-2 items-center">
							<CustomButton title={translate("common.cancel")} onClick={() => setEditAddressId(null)} />
							<CustomButton className="bg-primary-common text-white" title={translate("common.save")} type='submit' />
						</Box>
					}
				</Box>
				{selectedAddressIndex === index &&
					<Box className="flex flex-col border border-gray-300 p-5 gap-4">
						<Box className="flex flex-row gap-2">
							<CustomFieldMapper formFields={addressFields.slice(0, 2)} formData={{}} />
						</Box>
						<Box className="flex flex-col gap-4">
							<CustomFieldMapper formFields={addressFields.slice(2, 4)} formData={{}} />
						</Box>
						<Box className="grid grid-cols-2 gap-4">
							<CustomFieldMapper formFields={addressFields.slice(5, 13)} formData={{}} />
						</Box>
					</Box>
				}
			</Box>
		))
	)

}

export default AddressFormLayout;