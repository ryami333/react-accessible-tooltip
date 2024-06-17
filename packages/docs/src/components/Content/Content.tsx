import React from 'react';
import Container from '../Container/Container';
import './content.css';
import Tooltip from '../Tooltip/Tooltip';

function Content() {
    return (
        <div className="content">
            <Container>
                <p>
                    <Tooltip
                        label="Ullamco"
                        overlay="Lorem ipsum consequat aliqua nisi dolor ut sint excepteur dolore quis."
                    />
                    {` qui do laboris voluptate nisi aliqua non commodo ad laborum reprehenderit magna ad tempor anim in consequat anim consequat labore dolor incididunt nisi ullamco quis voluptate aute ex enim nostrud voluptate anim cillum cupidatat exercitation nisi excepteur exercitation commodo deserunt exercitation ad fugiat eu fugiat deserunt quis exercitation adipisicing cillum quis mollit duis enim aliqua voluptate voluptate eu occaecat est ut mollit voluptate ut `}
                    <Tooltip
                        label="reprehenderit"
                        overlay="Dolor aliqua dolor exercitation labore cupidatat in magna culpa quis eu sint commodo do est ut."
                    />
                    {` magna pariatur veniam in labore enim in nulla laborum eiusmod duis officia in veniam pariatur voluptate ut officia labore ut elit in deserunt dolor incididunt ut ad qui consectetur aliquip sit ex incididunt fugiat proident esse adipisicing eiusmod eiusmod in velit voluptate duis cupidatat adipisicing proident quis esse nisi labore esse dolore qui veniam cupidatat ex nostrud excepteur ad cupidatat amet dolore aliquip et culpa non irure ut tempor pariatur quis elit voluptate laborum nisi magna in eiusmod velit aliquip reprehenderit eu `}
                    <Tooltip
                        label="dolor"
                        overlay="Ullamco cillum ut pariatur pariatur qui do tempor incididunt id ullamco."
                    />
                    {`.`}
                </p>

                <p>
                    <Tooltip
                        label="Minim"
                        overlay="Cupidatat fugiat ut tempor nostrud ad esse sed proident ullamco deserunt."
                    />
                    {` ex ullamco nostrud nisi amet culpa ut voluptate qui occaecat magna labore ullamco labore mollit eiusmod aliqua consectetur laboris consectetur fugiat tempor magna laboris eiusmod labore do dolor laborum culpa sunt amet reprehenderit ut labore eiusmod aliqua cillum laboris in aute tempor ullamco esse laboris in sint amet dolor sint fugiat sit minim cupidatat excepteur non exercitation quis dolor excepteur duis duis enim exercitation ad est id in incididunt veniam minim commodo ut elit laborum labore consectetur ad laborum eu veniam cillum commodo incididunt mollit adipisicing enim elit dolor nulla deserunt labore ullamco proident commodo aliqua veniam irure ex `}
                    <Tooltip
                        label="adipisicing"
                        overlay="Consectetur laboris ut non eu irure ad dolore amet elit ex in dolor."
                    />
                    {` enim sit in cupidatat ea dolor commodo irure aliqua culpa commodo ad adipisicing do elit qui et culpa irure tempor quis sunt magna non nisi commodo reprehenderit do occaecat eu voluptate veniam sint irure ut in voluptate aliquip sed cillum quis voluptate qui irure nostrud ut est aliqua exercitation sit exercitation voluptate proident incididunt anim id nisi ullamco officia ut magna esse anim labore dolore tempor commodo excepteur aliquip proident sed ut commodo in in cillum nisi veniam nostrud ut qui esse commodo deserunt qui nulla esse sit in id officia excepteur esse duis veniam laboris consequat mollit commodo ex non culpa amet mollit incididunt commodo culpa laborum cupidatat minim dolor consequat dolor laboris laboris ut culpa `}
                    <Tooltip
                        label="voluptate"
                        overlay="Sit sunt ut proident ut ullamco sint ad occaecat et qui anim occaecat."
                    />
                    {`.`}
                </p>
            </Container>
        </div>
    );
}

export default Content;
