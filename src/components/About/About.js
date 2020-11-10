import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMenuOpen } from '../../state/actions/appActions';
import './About.sass';

function About(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setMenuOpen(true))
    }, []);

    return(
        <section className="About">
            <h1>Rreth nesh</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, atque ut. At rerum incidunt id sit dolor. Alias, voluptas eaque molestias tenetur perferendis repellat itaque voluptatem, asperiores perspiciatis quidem iste. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem blanditiis neque enim ipsum ullam itaque, accusamus adipisci fuga. Quae maiores, aspernatur eveniet vitae repudiandae numquam possimus corrupti distinctio voluptatibus rerum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat quo doloribus aspernatur esse, atque sit. Libero ea, recusandae dignissimos cum vitae numquam atque labore iste. Aut fuga suscipit perspiciatis facilis.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis saepe ipsum veniam. Dolore aspernatur voluptates voluptas vitae neque, ex eos, atque quisquam tenetur eum natus delectus iusto! Eaque, earum reprehenderit! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium nulla numquam nihil incidunt, totam minima pariatur expedita vel quae debitis sequi aliquid. Dolorem iure, earum voluptate harum quos ad laudantium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ex ullam corrupti quos quia vel commodi maiores blanditiis quidem sint ea laboriosam, mollitia magni at nostrum hic ipsa nesciunt sapiente?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam blanditiis velit libero voluptates facere ullam nostrum!</p>
        </section>
    )
}

export default About;