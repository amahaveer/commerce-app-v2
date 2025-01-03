import { Box, Typography, IconButton, Table, TableBody, TableHead, TableFooter, TableRow, TableCell,  TableContainer } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchBar from '@/components/atoms/SearchBar';
import CustomButton from '@/components/atoms/Button';
import SelectDropdown from '@/components/atoms/SelectDropdown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getProductVariantSelectionOptions } from 'utils/product';
import { IProductSelectionVariants } from 'types/product.type';
import { useEffect, useState } from 'react';
import AutoCompleteDropdown from '@/components/atoms/AutoCompleteDropdown';
import { columns } from './def';
import IconTextLink from '@/components/atoms/IconTextLink';
import ChipComponent from '@/components/atoms/Chip';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { eToolbarButtonActions } from '@/components/molecules/SaveToolBar/type';
import { initialProductSelectionValues } from 'constants/product.constant';
import { getProductSelections } from 'app/api/productSelection.api';
import { useLanguage } from 'context/language.context';

const ProductSelection = () => {

	const { translate } = useTranslate();
	const { locale, DEFAULT_LOCALE } = useLanguage();
	const [selectionVariants, setSelectionVariants] = useState<Array<any>>([]);
	const [userInput, setUserInput] = useState<IProductSelectionVariants>(initialProductSelectionValues)
	const [editIndex, setEditIndex] = useState<number>(-1);
	const [productSelectionOptions, setProductSelectionOptions] = useState([]);

	const options = getProductVariantSelectionOptions(translate);

	useEffect(() => {
		getProductSelectionOptions()
	}, [])
	
	const getProductSelectionOptions = async (searchValue?:string) => {
		try {
			let query = "";
			if (searchValue) {
				query=`?where=key=${searchValue}`;
			}
			const data = await getProductSelections({ query });
			if (!data.results) return;
			const mappedData = data.results.map((item: any) => ({
				id: item.id,
				key: item.key,
				label: item.name?.[locale] || item.name?.[DEFAULT_LOCALE],
				type: item.mode
			}))
			setProductSelectionOptions(mappedData)
		} catch (error) {
			console.log("ERROR::getProductVariantSelectionOptions", error)
		}
	}

	const onAssignVariants = () => {
		const newVariant: any = { selection: { type: "", key: "", value: "" }, skus: [], variantOption: "all" }
		setUserInput(newVariant)
		setSelectionVariants(prevState => [...prevState, newVariant])
		setEditIndex(selectionVariants.length);
	}

	const onSelectProductSelection = (value: any) => {
		setUserInput(prevValue => ({
			...prevValue,
			selection: value
		}));
		// setSelectionVariants((prevSelectionVariants) => {
		// 	const updatedVariants = [...prevSelectionVariants];
		// 	updatedVariants[index] = {
		// 		...updatedVariants[index],
		// 		selection: value,
		// 	};
		// 	return updatedVariants;
		// });
	}

	const onChangeProductVariantOption = (value: any, index: number) => {
		setUserInput(prevValue => ({
			...prevValue,
			variantOption: value
		}));
	}

	const onSelectSkus = (value: Array<any>, index: number) => {
		setUserInput(prevValue => ({
			...prevValue,
			skus: value
		}));
	}

	const onDeleteRow = (index: number) => {
		setSelectionVariants((prevVariants) => prevVariants.filter((_, i) => i !== index));
		setEditIndex(-1);
	}

	const renderOptions = (props: any, option: any) => {
		return (
			<Box key={option.key} component="li" {...props} className="flex flex-col px-4 mt-2">
				<Typography className='font-medium' variant="body1">
					{option.label}
				</Typography>
				{option.key && (
					<Typography variant="body2" color="textSecondary">
						Key: {option.key}
					</Typography>
				)}
				{option.type && (
					<Typography variant="body2" color="textSecondary">
						Type: {option.type}
					</Typography>
				)}
			</Box>
		)
	}

	const getProductSelectionText = (item: any) => {
		return (
			<Box className="flex flex-row items-center">
				<IconTextLink text={item.selection.label} />
				<ChipComponent
					className='h-[1.125rem] font-medium ml-2 p-1 rounded-none'
					type='success'
					label={`type: ${item.selection.type}`}
				/>
			</Box>
		)
	}

	const onToolbarAction = (action: eToolbarButtonActions) => {
		if (action === eToolbarButtonActions.SAVE) {
			setSelectionVariants((prevSelectionVariants) => {
				const updatedVariants = [...prevSelectionVariants];
				updatedVariants[editIndex] = userInput
				return updatedVariants;
			});
			setEditIndex(-1);
		}
		if (action === eToolbarButtonActions.CANCEL) {
			setSelectionVariants((prevVariants) => prevVariants.filter((item) => item.selection.label));
			setEditIndex(-1);
		}
	}

	return (
		<Box className="flex flex-col px-10 pt-5">
			<Box className="flex flex-col w-[100%]">
				<Box>
					<Typography>{translate("product.assignVariantsToProductSelections")}</Typography>
					<Box className="flex items-center ml-[-0.5625rem]">
						<IconButton className='text-customBlue-sky' aria-label="Info">
							<InfoOutlinedIcon />
						</IconButton>
						<Typography >{translate("product.singleAssignmentPerSelection")}</Typography>
					</Box>
				</Box>

				<Typography className="text-commerceBlack text-[1.25rem] mb-2 mt-4 font-medium">
					{translate("product.productSelections")}
				</Typography>

				<Box className="flex flex-row items-center mt-4" gap={1}>
					<Typography className=''>{translate("product.filterByStore")}:</Typography>
					<SearchBar
						className='w-[21.375rem]'
						onClickSearch={() => { }}
						placeholder={translate("common.selectOrTypeStorekey")}
					/>
				</Box>

				<TableContainer className='w-full mt-4'>
					<Table>
						<TableHead className=' bg-customGray-whisper '>
							<TableRow >
								{columns.map((item, index) => (
									<TableCell key={index} className='font-inter text-customGray'>
										{item.headerName}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{selectionVariants?.length > 0 && selectionVariants.map((item: any, index) => (
								<TableRow key={index}>

									<TableCell className='w-[31.12rem]'>
										{/* Select Product Selection */}
										{/* INFO: show text if its not in edit mode and it should have value not null else show dropdown */}
										{(index !== editIndex && item.selection?.label) ?
											getProductSelectionText(item) :
											<AutoCompleteDropdown
												key={`a${index}`}
												renderOption={renderOptions}
												options={productSelectionOptions}
												onSelect={(value) => onSelectProductSelection(value)}
												height='2.5rem'
												placeholder='Select a product selection or search by name'
												fetchData={getProductSelectionOptions}
												asyncSearch={true}
											/>
										}
									</TableCell>

									<TableCell className='px-4'>
										<Box className="flex flex-col" gap={1}>
											{/* Select Variants Type */}
											<Box className="flex flex-row">
												<SelectDropdown
													className='w-[40.9375rem]'
													options={options}
													defaultValue={index === editIndex ? userInput.variantOption : item.variantOption}
													onSelect={(value) => onChangeProductVariantOption(value, index)}
													disabled={index !== editIndex}
												/>
												{/* INFO: hide edit button from the row which newly added  */}
												{editIndex !== index &&
													<IconButton className='text-customGray' onClick={() => setEditIndex(index)} aria-label="Info">
														<EditIcon />
													</IconButton>
												}
												<IconButton className='ml-auto' onClick={() => onDeleteRow(index)} aria-label="Info">
													<DeleteIcon />
												</IconButton>
											</Box>

											{/* SKUs selection */}
											{((index===editIndex && userInput.variantOption !== "all") ||
											 (index!=editIndex && item.variantOption !== "all")) &&
												<AutoCompleteDropdown
													className="w-[40.9375rem] items-center"
													placeholder='Select SKU(s)'
													padding='0px 0px 0px 6px'
													fullWidth
													key={`b${index}`}
													options={[{ value: "IC-1006", label: "IC-1006" }]}
													multiple={true}
													limitTags={5}
													disabled={index !== editIndex}
													height='2.5rem'
													onSelect={(value) => onSelectSkus(value, index)}
												/>
											}
										</Box>
									</TableCell>
								</TableRow>
							))}

						</TableBody>

						<TableFooter>
							<TableRow>
								<TableCell colSpan={2}>
									<Box display="flex" justifyContent="flex-start">
										{/* INFO: disable add button if any row is in editmode or new row is adding */}
										<CustomButton.Add
											className='normal-case'
											disabled={editIndex > -1}
											title='Assign Variants to a Product Selection'
											onClick={onAssignVariants}
										/>
									</Box>
								</TableCell>
							</TableRow>
						</TableFooter>

					</Table>
				</TableContainer>
			</Box>

			<SaveToolbar isVisible={editIndex > -1} showSave={true} onClickAction={onToolbarAction} />
		</Box>
	)
}

export default ProductSelection;