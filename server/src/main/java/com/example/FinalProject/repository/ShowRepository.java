package com.example.FinalProject.repository;

import com.example.FinalProject.Entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowRepository extends JpaRepository<Show,Integer>{

}
