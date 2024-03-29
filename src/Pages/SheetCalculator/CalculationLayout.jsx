import {Alert} from "react-bootstrap";

export function CalculationLayout(props) {
    const isAdmin = JSON.parse(localStorage.getItem('currentUser'))?.user.role
    return (
        <div>
            <Alert>
                <div>
                    <h5>{props.calcData?.calculation ? props?.calcName + ';': ''} {props.calcData?.calculation?.name}</h5>
                    <p>Тираж: {props.calcData?.calculation?.quantity} экз.</p>
                    <p>Цветность лица: {props.calcData?.calculation?.chromaticity_front}</p>
                    <p>Цветность оборота: {props.calcData?.calculation?.chromaticity_back} </p>
                    {/*<p>Материал изделия: {props.calcData?.calculation.material} </p>*/}
                    <p>Ширина изделия: {props.calcData?.calculation?.width} мм </p>
                    <p>Высота изделия: {props.calcData?.calculation?.height} мм </p>
                    <hr></hr>
                    <p>Стоимость за единицу: <b>{props.calcData?.calculation?.price}</b> руб.</p>
                    <p>Стоимость тиража: <b>{props.calcData?.calculation?.total}</b> руб.</p>

                    <hr></hr>
                    <div hidden={isAdmin < 2}>
                    <p><b>Service info:</b></p>
                    <p>Количество
                        на листе: <b>{props.calcData?.calculation?.multiplicity}</b></p>
                    <p>Печатных листов
                        требуется: <b>{props.calcData?.calculation?.sheets_required}</b> шт.</p>
                    <p>Себестоимость
                        материалов: <b>{props.calcData?.calculation?.total_cost_of_materials}</b> руб.
                    </p>
                    <p>Себестоимость
                        печати: <b>{props.calcData?.calculation?.total_cost_of_printing}</b> руб.
                    </p>
                    <p>Стоимость допечатной
                        подготовки: <b>{props.calcData?.calculation?.prepress_price}</b> руб.</p>
                    <p>Стоимость постпечатных
                        опций: <b>{props.calcData?.calculation?.postpress_total}</b> руб.</p>
                    <p>Стоимость материалов
                        постпечатной обработки: <b>{props.calcData?.calculation?.postpress_materials_cost}</b> руб.</p>
                </div>
                    </div>
            </Alert>
        </div>
    )
}