import {Alert} from "react-bootstrap";

export function CalculationLayout(props) {
    return (
        <div>
            <Alert>
                <div className>
                    <h5>{props.calcData?.calculation.name}</h5>
                    <p>Тираж: {props.calcData?.calculation.quantity} экз.</p>
                    <p>Цветность лица: {props.calcData?.calculation.chromaticity_front}</p>
                    <p>Цветность оборота: {props.calcData?.calculation.chromaticity_back} </p>
                    {/*<p>Материал изделия: {props.calcData?.calculation.material} </p>*/}
                    <p>Ширина изделия: {props.calcData?.calculation.width} мм </p>
                    <p>Высота изделия: {props.calcData?.calculation.height} мм </p>
                    <hr></hr>
                    <p>Стоимость за единицу: <b>{props.calcData?.calculation.price}</b> руб.</p>
                    <p>Стоимость тиража: <b>{props.calcData?.calculation.total}</b> руб.</p>
                    <p>Стоимость постпечатных
                        опций: <b>{props.calcData?.calculation.postpress_total}</b> руб.</p>
                    <hr></hr>
                    <p><b>Service info:</b></p>
                    <p>Печатных листов
                        требуется: <b>{props.calcData?.calculation.sheets_required}</b> шт.</p>
                    <p>Себестоимость
                        материалов: <b>{props.calcData?.calculation.total_cost_of_materials}</b> руб.
                    </p>
                    <p>Себестоимость
                        печати: <b>{props.calcData?.calculation.total_cost_of_printing}</b> руб.
                    </p>
                    <p>Стоимость постпечатных
                        опций: <b>{props.calcData?.calculation.postpress_total}</b> руб.</p>
                </div>
            </Alert>
        </div>
    )
}